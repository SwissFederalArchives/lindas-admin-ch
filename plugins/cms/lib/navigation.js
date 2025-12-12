import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

/**
 * Read navigation configuration for a section
 * @param {string} configDir - The config directory (usually the repo root)
 * @param {string} section - 'header' or 'footer'
 * @returns {Promise<Array>} Array of navigation items
 */
export async function readNavigation(configDir, section) {
  const configPath = join(configDir, 'config', 'navigation.json')

  try {
    const content = await readFile(configPath, 'utf-8')
    const config = JSON.parse(content)
    return config[section] || []
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If file doesn't exist, return default structure
      return getDefaultNavigation(section)
    }
    throw err
  }
}

/**
 * Write navigation configuration for a section
 * @param {string} configDir - The config directory
 * @param {string} section - 'header' or 'footer'
 * @param {Array} items - Array of navigation items
 */
export async function writeNavigation(configDir, section, items) {
  const configPath = join(configDir, 'config', 'navigation.json')

  let config = {}
  try {
    const content = await readFile(configPath, 'utf-8')
    config = JSON.parse(content)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
    // File doesn't exist, start with defaults
    config = {
      header: getDefaultNavigation('header'),
      footer: getDefaultNavigation('footer')
    }
  }

  config[section] = items

  const jsonContent = JSON.stringify(config, null, 2) + '\n'
  await writeFile(configPath, jsonContent, 'utf-8')
}

/**
 * Get default navigation structure
 * @param {string} section - 'header' or 'footer'
 * @returns {Array} Default navigation items
 */
function getDefaultNavigation(section) {
  if (section === 'header') {
    return [
      { labelKey: 'nav.home', url: '/' },
      { labelKey: 'nav.sparql', url: '/sparql' },
      { labelKey: 'nav.datasets', url: '/datasets' }
    ]
  } else if (section === 'footer') {
    return [
      { labelKey: 'nav.imprint', url: '/imprint' },
      { labelKey: 'nav.privacy', url: '/privacy' },
      { labelKey: 'nav.accessibility', url: '/accessibility' }
    ]
  }
  return []
}
