import { promises as fs } from 'fs'
import { dirname, join as pathJoin } from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import addClasses from './addClasses.js'

const currentDir = dirname(fileURLToPath(import.meta.url))

/**
 * Return a HTML string from a Markdown string.
 *
 * @param {string} markdownString
 * @returns HTML string
 */
const convertToHtml = async (markdownString) => {
  const html = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug, {
      prefix: 'content-'
    })
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        class: 'headers-autolink'
      }
    })
    .use(addClasses, {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      table: 'table'
    })
    .use(rehypeStringify)
    .process(markdownString)

  return html.toString()
}

/**
 * Get all subdirectories of that particular directory.
 *
 * @param {string} path path of the starting directory
 * @returns list of all directories present in that directory
 */
const getItems = async (path) => {
  const directories = []

  const pathContent = await fs.readdir(path, { withFileTypes: true })

  for (const item of pathContent) {
    if (!item.isDirectory()) {
      continue
    }
    const fullPath = pathJoin(path, item.name)
    directories.push({
      name: item.name,
      path: fullPath
    })
  }

  return directories
}

/**
 * Read all markdown files from a directory and convert them in HTML format.
 *
 * @param {string} path path of the directory to read
 * @returns list of files that are in that directory
 */
const getContent = async (path) => {
  const files = []

  const pathContent = await fs.readdir(path, { withFileTypes: true })

  for (const item of pathContent) {
    if (item.isDirectory()) {
      continue
    }
    const fullPath = pathJoin(path, item.name)
    if (!fullPath.endsWith('.md')) {
      continue
    }

    const content = await fs.readFile(fullPath, 'utf-8')
    const html = await convertToHtml(content)
    files.push({
      language: item.name.replace(/\.md*/, ''),
      path: fullPath,
      html
    })
  }

  return files
}

/**
 * Return all keys for the specific language.
 *
 * @param {Record<string, any>} store
 * @param {string} language
 * @returns
 */
const entriesForLanguage = (store, language = 'en') => {
  const finalStore = {}

  for (const [key, item] of Object.entries(store)) {
    let value = null
    let fallbackValue = null

    // eslint-disable-next-line array-callback-return
    item.map((item) => {
      if (item.language === language) {
        value = item.html
      }
      if (item.language === 'default') {
        fallbackValue = item.html
      }
    })

    if (value === null && fallbackValue !== null) {
      value = fallbackValue
    }

    if (value === null) {
      value = ''
    }

    finalStore[key] = value
  }

  return finalStore
}

const contentMiddleware = ({ logger, namespace, store }) => async (_req, res, next) => {
  logger.debug(`loaded store into '${namespace}' namespace`)

  // just make sure that the `content-plugin` entry exists
  if (!res.locals['content-plugin']) {
    res.locals['content-plugin'] = {}
  }

  // add all configured entries for the specified namespace
  const lang = res?.locals?.currentLanguage || 'en'
  res.locals['content-plugin'][namespace] = entriesForLanguage(store, lang)

  // let's forward all of this to other middlewares
  return next()
}

const factory = async (trifid) => {
  const { config, logger, server, render } = trifid
  const { namespace, directory, mountPath } = config

  // check config
  const configuredNamespace = namespace ?? 'default'
  if (!directory || typeof directory !== 'string') {
    throw new Error('\'directory\' should be a non-empty string')
  }
  const mountAtPath = mountPath || false

  const store = {}
  const items = await getItems(directory)

  for (const item of items) {
    store[item.name] = await getContent(item.path)
  }

  // apply the middleware in all cases
  server.use(contentMiddleware({ logger, namespace: configuredNamespace, store }))

  // create a route for each entry
  if (mountAtPath) {
    const mountAtPathSlash = mountAtPath.endsWith('/') ? mountAtPath : `${mountAtPath}/`

    for (const item of items) {
      server.get(`${mountAtPathSlash}${item.name}`, async (_req, res, _next) => {
        res.send(await render(`${currentDir}/../../views/content.hbs`, {
          content: res.locals['content-plugin'][namespace][item.name] || '',
          locals: res.locals
        }))
      })
    }
  }

  // just return a dummy middleware
  return (_req, _res, next) => {
    next()
  }
}

export default factory
