import { createReadStream, createWriteStream } from 'fs'
import { readdir, readFile, writeFile, mkdir, stat, rm } from 'fs/promises'
import { join, relative, dirname } from 'path'
import { pipeline } from 'stream/promises'
import { createGzip, createGunzip } from 'zlib'
import { Readable } from 'stream'

/**
 * Create a JSON-based archive of all CMS content
 * This uses a simple JSON format since we want to avoid external dependencies
 * @param {string} contentDir - The content directory
 * @param {string} localesDir - The locales directory
 * @param {string} configDir - The config directory (for navigation)
 * @returns {Promise<Object>} Archive data object
 */
export async function createArchive(contentDir, localesDir, configDir) {
  const archive = {
    version: '1.0',
    createdAt: new Date().toISOString(),
    content: {},
    locales: {},
    navigation: null
  }

  // Collect content files
  const contentFiles = await collectFiles(contentDir)
  for (const filePath of contentFiles) {
    const relativePath = relative(contentDir, filePath).replace(/\\/g, '/')
    const content = await readFile(filePath, 'utf-8')
    archive.content[relativePath] = content
  }

  // Collect locale files
  try {
    const localeEntries = await readdir(localesDir, { withFileTypes: true })
    for (const entry of localeEntries) {
      if (entry.isFile() && entry.name.endsWith('.json')) {
        const fullPath = join(localesDir, entry.name)
        const content = await readFile(fullPath, 'utf-8')
        archive.locales[entry.name] = JSON.parse(content)
      }
    }
  } catch (err) {
    console.error('Error reading locales:', err.message)
  }

  // Collect navigation config
  try {
    const navPath = join(configDir, 'config', 'navigation.json')
    const navContent = await readFile(navPath, 'utf-8')
    archive.navigation = JSON.parse(navContent)
  } catch (err) {
    // Navigation config may not exist
    archive.navigation = null
  }

  return archive
}

/**
 * Export archive as downloadable JSON (gzipped)
 * @param {string} contentDir - The content directory
 * @param {string} localesDir - The locales directory
 * @param {string} configDir - The config directory
 * @returns {Promise<Buffer>} Gzipped JSON buffer
 */
export async function exportArchive(contentDir, localesDir, configDir) {
  const archive = await createArchive(contentDir, localesDir, configDir)
  const jsonString = JSON.stringify(archive, null, 2)

  // Return as plain JSON for simplicity (can be gzipped in a future version)
  return Buffer.from(jsonString, 'utf-8')
}

/**
 * Import archive from JSON data
 * @param {string} contentDir - The content directory
 * @param {string} localesDir - The locales directory
 * @param {string} configDir - The config directory
 * @param {Object} archiveData - The archive data object
 * @param {Object} options - Import options
 * @returns {Promise<Object>} Import result
 */
export async function importArchive(contentDir, localesDir, configDir, archiveData, options = {}) {
  const { overwrite = false, skipContent = false, skipLocales = false, skipNavigation = false } = options
  const results = {
    content: { created: 0, updated: 0, skipped: 0 },
    locales: { created: 0, updated: 0, skipped: 0 },
    navigation: { updated: false }
  }

  // Import content files
  if (!skipContent && archiveData.content) {
    for (const [relativePath, content] of Object.entries(archiveData.content)) {
      const fullPath = join(contentDir, relativePath)

      // Check if file exists
      let exists = false
      try {
        await stat(fullPath)
        exists = true
      } catch {
        // File doesn't exist
      }

      if (exists && !overwrite) {
        results.content.skipped++
        continue
      }

      // Create parent directories
      const parentDir = dirname(fullPath)
      await mkdir(parentDir, { recursive: true })

      // Write file
      await writeFile(fullPath, content, 'utf-8')
      if (exists) {
        results.content.updated++
      } else {
        results.content.created++
      }
    }
  }

  // Import locale files
  if (!skipLocales && archiveData.locales) {
    for (const [filename, content] of Object.entries(archiveData.locales)) {
      const fullPath = join(localesDir, filename)

      // Check if file exists
      let exists = false
      try {
        await stat(fullPath)
        exists = true
      } catch {
        // File doesn't exist
      }

      if (exists && !overwrite) {
        results.locales.skipped++
        continue
      }

      // Write file
      const jsonContent = JSON.stringify(content, null, 2) + '\n'
      await writeFile(fullPath, jsonContent, 'utf-8')
      if (exists) {
        results.locales.updated++
      } else {
        results.locales.created++
      }
    }
  }

  // Import navigation
  if (!skipNavigation && archiveData.navigation) {
    const navPath = join(configDir, 'config', 'navigation.json')
    const parentDir = dirname(navPath)
    await mkdir(parentDir, { recursive: true })

    const jsonContent = JSON.stringify(archiveData.navigation, null, 2) + '\n'
    await writeFile(navPath, jsonContent, 'utf-8')
    results.navigation.updated = true
  }

  return results
}

/**
 * Recursively collect all files in a directory
 * @param {string} dir - Directory to scan
 * @param {Array} files - Array to collect files into
 * @returns {Promise<Array>} Array of file paths
 */
async function collectFiles(dir, files = []) {
  try {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        await collectFiles(fullPath, files)
      } else if (entry.isFile()) {
        files.push(fullPath)
      }
    }
  } catch (err) {
    console.error('Error collecting files:', err.message)
  }

  return files
}
