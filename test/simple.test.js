import { describe, it } from 'node:test'
import { ok } from 'node:assert'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

describe('CSP Mitigation Implementation Tests', () => {
  it('should have CSP violations plugin file', () => {
    const pluginPath = join(rootDir, 'plugins', 'csp-violations', 'index.js')
    ok(existsSync(pluginPath), 'CSP violations plugin should exist')
  })

  it('should have CSP violations plugin properly configured in config.yaml', () => {
    const configPath = join(rootDir, 'config.yaml')
    ok(existsSync(configPath), 'config.yaml should exist')

    const configContent = readFileSync(configPath, 'utf8')
    ok(configContent.includes('csp-violations:'), 'Should have csp-violations plugin configured')
    ok(configContent.includes('file:plugins/csp-violations/index.js'), 'Should reference local plugin file')
  })

  it('should have proper package.json dependencies for CSP functionality', () => {
    const packagePath = join(rootDir, 'package.json')
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))

    // Verify we're using published packages
    ok(packageJson.dependencies['lindas-trifid'], 'Should have lindas-trifid dependency')
    ok(packageJson.dependencies['lindas-trifid-plugin-ckan'], 'Should have lindas-trifid-plugin-ckan dependency')
    ok(packageJson.dependencies['lindas-trifid-markdown-content'], 'Should have lindas-trifid-markdown-content dependency')

    // Verify no local file references
    const deps = JSON.stringify(packageJson.dependencies)
    ok(!deps.includes('file:../'), 'Should not have local file references in dependencies')
  })

  it('should have CSP violations plugin with proper exports', () => {
    const pluginPath = join(rootDir, 'plugins', 'csp-violations', 'index.js')
    const pluginContent = readFileSync(pluginPath, 'utf8')

    // Check for key CSP security patterns
    ok(pluginContent.includes('CSP Violation'), 'Should handle CSP violations')
    ok(pluginContent.includes('defaultConfiguration'), 'Should export defaultConfiguration')
    ok(pluginContent.includes('routeHandler'), 'Should export routeHandler')
    ok(pluginContent.includes('/api/csp-violations'), 'Should handle CSP violation reports')

    // Check for security monitoring
    ok(pluginContent.includes('javascript:'), 'Should detect javascript: protocol attacks')
    ok(pluginContent.includes('onerror'), 'Should detect event handler attacks')
    ok(pluginContent.includes('<script'), 'Should detect script injection attacks')
  })

  it('should have configuration using correct published package names', () => {
    const configPath = join(rootDir, 'config.yaml')
    const configContent = readFileSync(configPath, 'utf8')

    // Verify plugin module names match published packages
    ok(configContent.includes('lindas-trifid-plugin-ckan'), 'Should use published ckan package name')
    ok(configContent.includes('lindas-trifid-plugin-sparql-proxy'), 'Should use published sparql-proxy package name')
    ok(configContent.includes('lindas-trifid-markdown-content'), 'Should use published markdown-content package name')
    ok(configContent.includes('lindas-trifid-core/plugins/'), 'Should use published core package for built-in plugins')
  })

  it('should have proper CSP reporting endpoint configured', () => {
    const configPath = join(rootDir, 'config.yaml')
    const configContent = readFileSync(configPath, 'utf8')

    // Check for CSP violation reporting configuration
    ok(configContent.includes('csp-violations'), 'Should have CSP violations plugin configured')
    ok(configContent.includes('file:plugins/csp-violations/index.js'), 'Should reference the CSP violations plugin file')
  })

  it('should have lint-compliant CSP plugin code', () => {
    const pluginPath = join(rootDir, 'plugins', 'csp-violations', 'index.js')
    const pluginContent = readFileSync(pluginPath, 'utf8')

    // Basic lint checks (these would be caught by standard but good to verify)
    ok(!pluginContent.includes('  ,'), 'Should not have trailing commas with extra spaces')
    ok(!pluginContent.includes('function('), 'Should have space before function parentheses')

    // Should end with newline
    ok(pluginContent.endsWith('\n'), 'File should end with newline')
  })
})
