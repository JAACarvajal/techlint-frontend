export function sanitize(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

export function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}
