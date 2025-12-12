import { readdir, readFile, writeFile, stat, mkdir, unlink, rmdir } from 'fs/promises'
import { join, relative, extname, dirname } from 'path'

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
 * Create a new content file
 * @param {string} baseDir - The base content directory
 * @param {string} filePath - Relative path for the new file
 * @param {string} content - Initial content for the file
 */
export async function createContentFile(baseDir, filePath, content = '') {
  // Prevent directory traversal attacks
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/\.\./g, '')

  // Ensure it's a markdown file
  const finalPath = normalizedPath.endsWith('.md') ? normalizedPath : `${normalizedPath}.md`
  const fullPath = join(baseDir, finalPath)

  // Verify the path is within the base directory
  const relativePath = relative(baseDir, fullPath)
  if (relativePath.startsWith('..') || relativePath.startsWith('/')) {
    throw new Error('Invalid file path')
  }

  // Check if file already exists
  try {
    await stat(fullPath)
    throw new Error('File already exists')
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }

  // Create parent directories if they don't exist
  const parentDir = dirname(fullPath)
  await mkdir(parentDir, { recursive: true })

  // Create the file with initial content
  const initialContent = content || `# New Page\n\nAdd your content here.\n`
  await writeFile(fullPath, initialContent, 'utf-8')

  return finalPath
}

/**
 * Delete a content file
 * @param {string} baseDir - The base content directory
 * @param {string} filePath - Relative path to the file to delete
 */
export async function deleteContentFile(baseDir, filePath) {
  // Prevent directory traversal attacks
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/\.\./g, '')
  const fullPath = join(baseDir, normalizedPath)

  // Verify the path is within the base directory
  const relativePath = relative(baseDir, fullPath)
  if (relativePath.startsWith('..') || relativePath.startsWith('/')) {
    throw new Error('Invalid file path')
  }

  // Verify the file exists and is a file
  const stats = await stat(fullPath)
  if (!stats.isFile()) {
    throw new Error('Path is not a file')
  }

  // Delete the file
  await unlink(fullPath)

  // Try to remove empty parent directories (up to baseDir)
  let currentDir = dirname(fullPath)
  while (currentDir !== baseDir && currentDir.startsWith(baseDir)) {
    try {
      const entries = await readdir(currentDir)
      // Only remove if directory is empty (or only has .gitkeep)
      const nonGitkeepEntries = entries.filter(e => e !== '.gitkeep')
      if (nonGitkeepEntries.length === 0) {
        // Remove .gitkeep if present
        if (entries.includes('.gitkeep')) {
          await unlink(join(currentDir, '.gitkeep'))
        }
        await rmdir(currentDir)
        currentDir = dirname(currentDir)
      } else {
        break
      }
    } catch {
      break
    }
  }
}

/**
 * List all folders in the content directory
 * @param {string} baseDir - The base content directory
 * @returns {Promise<Array>} Array of folder paths
 */
export async function listContentFolders(baseDir, subDir = '') {
  const currentDir = join(baseDir, subDir)
  const folders = []

  try {
    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const folderPath = join(subDir, entry.name).replace(/\\/g, '/')
        folders.push(folderPath)
        // Recursively get subfolders
        const subFolders = await listContentFolders(baseDir, folderPath)
        folders.push(...subFolders)
      }
    }
  } catch (err) {
    console.error(`Error listing folders in ${currentDir}:`, err.message)
  }

  return folders.sort()
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
