// @ts-check
import { selectAll } from 'hast-util-select'

// Copied from @lindas/trifid-plugin-markdown-content/src/addClasses.js
// Needed locally so the content-reload plugin can recompile markdown
// without depending on the internal module path.

export default (additions) => {
  const adders = Object.entries(additions).map(adder)
  return (node) => adders.forEach(a => a(node))
}

const adder = ([selector, className]) => {
  const writer = write(className)
  return (node) => selectAll(selector, node).forEach(writer)
}

/**
 * Add a class name to the properties of a node.
 *
 * @param {string} className Class name to add.
 * @returns {({properties}: any) => void} Function that adds the class name to the properties.
 */
const write = (className) => ({ properties }) => {
  if (!properties.className) {
    properties.className = className
  } else {
    properties.className += ` ${className}`
  }
}
