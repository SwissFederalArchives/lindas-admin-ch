import { selectAll } from 'hast-util-select'

// inspired by: https://github.com/martypdx/rehype-add-classes

export default (additions) => {
  const adders = Object.entries(additions).map(adder)
  return (node) => adders.forEach(a => a(node))
}

const adder = ([selector, className]) => {
  const writer = write(className)
  return (node) => selectAll(selector, node).forEach(writer)
}

const write = className => ({ properties }) => {
  if (!properties.className) {
    properties.className = className
  } else {
    properties.className += ` ${className}`
  }
}
