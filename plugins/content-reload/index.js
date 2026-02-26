// @ts-check

import { promises as fs } from 'node:fs'
import { join as pathJoin } from 'node:path'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import addClasses from './addClasses.js'

const RELOAD_INTERVAL_MS = 10_000
const LOCALS_PLUGIN_KEY = 'markdown-content-plugin'

/**
 * Convert a markdown string to HTML, matching the pipeline used by
 * @lindas/trifid-plugin-markdown-content.
 */
const convertToHtml = async (markdownString, config) => {
  const processors = [
    [remarkParse],
    [remarkFrontmatter],
    [remarkGfm],
    [remarkRehype],
    [rehypeSlug, { prefix: config.idPrefix }]
  ]

  if (config.autoLink) {
    processors.push([rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { class: 'headers-autolink' }
    }])
  }

  processors.push([addClasses, config.classes])
  processors.push([rehypeStringify])

  const processor = unified()
  for (const [plugin, options] of processors) {
    processor.use(plugin, options)
  }

  const html = await processor.process(markdownString)
  return html.toString()
}

/**
 * Scan a directory for subdirectories (each subdirectory = one content item).
 */
const getItems = async (dirPath) => {
  const directories = []
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        directories.push({
          name: entry.name,
          path: pathJoin(dirPath, entry.name)
        })
      }
    }
  } catch {
    // Directory missing -- will be caught by caller
  }
  return directories
}

/**
 * Read all .md files from a content item directory and compile to HTML.
 * Uses mtime tracking to skip unchanged files.
 *
 * @param {string} itemPath - path to the content item directory
 * @param {Record<string, any>} config - compilation config
 * @param {Map<string, { mtime: number, html: string }>} cache - per-file cache
 * @returns {Promise<{ files: Array<{ language: string, path: string, html: string }>, recompiled: number }>}
 */
const getContent = async (itemPath, config, cache) => {
  const files = []
  let recompiled = 0

  let dirEntries
  try {
    dirEntries = await fs.readdir(itemPath, { withFileTypes: true })
  } catch {
    return { files, recompiled }
  }

  for (const entry of dirEntries) {
    if (entry.isDirectory()) continue

    const fullPath = pathJoin(itemPath, entry.name)
    if (!fullPath.endsWith('.md')) continue

    const language = entry.name.replace(/\.md$/, '')

    // Check mtime to avoid unnecessary recompilation
    let stat
    try {
      stat = await fs.stat(fullPath)
    } catch {
      continue
    }

    const mtimeMs = stat.mtimeMs
    const cached = cache.get(fullPath)

    if (cached && cached.mtime === mtimeMs) {
      files.push({ language, path: fullPath, html: cached.html })
      continue
    }

    // File changed or new -- recompile
    const content = await fs.readFile(fullPath, 'utf-8')
    const html = await convertToHtml(content, config)

    cache.set(fullPath, { mtime: mtimeMs, html })
    files.push({ language, path: fullPath, html })
    recompiled++
  }

  return { files, recompiled }
}

/**
 * Pick HTML for a specific language, with fallback to 'default'.
 * Matches the logic in @lindas/trifid-plugin-markdown-content.
 */
const entriesForLanguage = (store, language = 'en') => {
  const result = {}

  for (const [key, items] of Object.entries(store)) {
    let value = null
    let fallback = null

    for (const item of items) {
      if (item.language === language) value = item.html
      if (item.language === 'default') fallback = item.html
    }

    result[key] = value ?? fallback ?? ''
  }

  return result
}

/** @type {import('../../node_modules/@lindas/trifid-core/types/index.js').TrifidPlugin} */
const factory = async (trifid) => {
  const { config, logger, server } = trifid

  const entries = config?.entries || {}
  const defaults = config?.defaults || {}

  const idPrefix = defaults.idPrefix ?? 'content-'
  const classes = defaults.classes ?? {}
  const autoLink = defaults.autoLink ?? true

  // Per-file mtime cache to avoid recompiling unchanged files
  const fileCache = new Map()

  // Compiled content store: { [namespace]: { [itemName]: [{ language, path, html }] } }
  let contentStore = {}
  let stopped = false

  /**
   * Scan all configured content directories and recompile changed files.
   */
  const reloadContent = async () => {
    const newStore = {}
    let recompiled = 0

    for (const [namespace, entry] of Object.entries(entries)) {
      if (stopped) return

      const directory = entry?.directory
      if (!directory || typeof directory !== 'string') continue

      const entryConfig = {
        idPrefix: entry.idPrefix ?? idPrefix,
        classes: entry.classes ?? classes,
        autoLink: entry.autoLink ?? autoLink
      }

      const items = await getItems(directory)
      const namespaceStore = {}

      for (const item of items) {
        if (stopped) return
        const result = await getContent(item.path, entryConfig, fileCache)
        namespaceStore[item.name] = result.files
        recompiled += result.recompiled
      }

      newStore[namespace] = namespaceStore
    }

    if (stopped) return

    contentStore = newStore

    if (recompiled > 0) {
      logger.debug(`content-reload: recompiled files in ${recompiled} item(s)`)
    }
  }

  // Initial load
  await reloadContent()
  logger.info('content-reload: initial content loaded')

  // Poll for changes
  const interval = setInterval(async () => {
    if (stopped) return
    try {
      await reloadContent()
    } catch (err) {
      if (!stopped) {
        logger.warn(`content-reload: failed to reload content: ${err.message}`)
      }
    }
  }, RELOAD_INTERVAL_MS)

  server.addHook('onClose', () => {
    stopped = true
    clearInterval(interval)
  })

  // Register onRequest hook -- this runs AFTER the markdown-content plugin's
  // hook because this plugin is registered later in config.yaml.
  // It overwrites the session data with our freshly compiled content.
  server.addHook('onRequest', (request, _reply, done) => {
    if (!request.session.has(LOCALS_PLUGIN_KEY)) {
      request.session.set(LOCALS_PLUGIN_KEY, {})
    }

    const currentLanguage =
      request.session.get('currentLanguage') ||
      request.session.get('defaultLanguage') ||
      'en'

    const currentContent = request.session.get(LOCALS_PLUGIN_KEY) || {}

    for (const [namespace, store] of Object.entries(contentStore)) {
      currentContent[namespace] = entriesForLanguage(store, currentLanguage)
    }

    request.session.set(LOCALS_PLUGIN_KEY, currentContent)
    done()
  })

  logger.info(`content-reload: polling ${Object.keys(entries).length} namespace(s) every ${RELOAD_INTERVAL_MS / 1000}s`)
}

export default factory
