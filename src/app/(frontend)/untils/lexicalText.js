export function lexicalText(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) {
    return node.children.map(lexicalText).join(' ')
  }
  return ''
}

export function asHtml(value) {
  return typeof value === 'string' ? value : lexicalText(value)
}
