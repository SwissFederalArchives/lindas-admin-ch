import { readdir, readFile, writeFile, stat } from 'fs/promises'
import { join, relative, extname } from 'path'

/**
 * Recursively list all content files in a directory
 * @param {string} baseDir - The base content directory
 * @param {string} [subDir=''] - Subdirectory to scan
 * @returns {Promise<Array>} Array of file objects with path and metadata
 */
export async function listContentFiles(baseDir, subDir = '') {
  const currentDir = join(baseDir, subDir)
  const files = []

  try {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = join(subDir, entry.name)

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = await listContentFiles(baseDir, entryPath)
        files.push(...subFiles)
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase()
        // Only include markdown files
        if (ext === '.md') {
          const fullPath = join(baseDir, entryPath)
          const stats = await stat(fullPath)

          files.push({
            path: entryPath.replace(/\\/g, '/'),
            name: entry.name,
            size: stats.size,
            modified: stats.mtime.toISOString(),
            type: 'markdown'
          })
        }
      }
    }
  } catch (err) {
    console.error(`Error listing content files in ${currentDir}:`, err.message)
  }

  return files.sort((a, b) => a.path.localeCompare(b.path))
}

/**
 * Read a content file
 * @param {string} baseDir - The base content directory
 * @param {string} filePath - Relative path to the file
 * @returns {Promise<string>} The file content
 */
export async function readContentFile(baseDir, filePath) {
  // Prevent directory traversal attacks
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/\.\./g, '')
  const fullPath = join(baseDir, normalizedPath)

  // Verify the path is within the base directory
  const relativePath = relative(baseDir, fullPath)
  if (relativePath.startsWith('..') || relativePath.startsWith('/')) {
    throw new Error('Invalid file path')
  }

  const content = await readFile(fullPath, 'utf-8')
  return content
}

/**
 * Write content to a file
 * @param {string} baseDir - The base content directory
 * @param {string} filePath - Relative path to the file
 * @param {string} content - The content to write
 */
export async function writeContentFile(baseDir, filePath, content) {
  // Prevent directory traversal attacks
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/\.\./g, '')
  const fullPath = join(baseDir, normalizedPath)

  // Verify the path is within the base directory
  const relativePath = relative(baseDir, fullPath)
  if (relativePath.startsWith('..') || relativePath.startsWith('/')) {
    throw new Error('Invalid file path')
  }

  await writeFile(fullPath, content, 'utf-8')
}

/**
 * List all locale files
 * @param {string} localesDir - The locales directory
 * @returns {Promise<Array>} Array of locale file objects
 */
export async function listLocaleFiles(localesDir) {
  const files = []

  try {
    const entries = await readdir(localesDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isFile() && extname(entry.name).toLowerCase() === '.json') {
        const locale = entry.name.replace('.json', '')
        const fullPath = join(localesDir, entry.name)
        const stats = await stat(fullPath)

        files.push({
          locale,
          filename: entry.name,
          size: stats.size,
          modified: stats.mtime.toISOString()
        })
      }
    }
  } catch (err) {
    console.error(`Error listing locale files:`, err.message)
  }

  return files.sort((a, b) => a.locale.localeCompare(b.locale))
}

/**
 * Read a locale file
 * @param {string} localesDir - The locales directory
 * @param {string} locale - The locale code (e.g., 'en', 'de')
 * @returns {Promise<Object>} The parsed locale content
 */
export async function readLocaleFile(localesDir, locale) {
  // Sanitize locale to prevent path traversal
  const sanitizedLocale = locale.replace(/[^a-z-]/gi, '')
  const fullPath = join(localesDir, `${sanitizedLocale}.json`)

  const content = await readFile(fullPath, 'utf-8')
  return JSON.parse(content)
}

/**
 * Write content to a locale file
 * @param {string} localesDir - The locales directory
 * @param {string} locale - The locale code
 * @param {Object} content - The locale content object
 */
export async function writeLocaleFile(localesDir, locale, content) {
  // Sanitize locale to prevent path traversal
  const sanitizedLocale = locale.replace(/[^a-z-]/gi, '')
  const fullPath = join(localesDir, `${sanitizedLocale}.json`)

  const jsonContent = JSON.stringify(content, null, 2) + '\n'
  await writeFile(fullPath, jsonContent, 'utf-8')
}
