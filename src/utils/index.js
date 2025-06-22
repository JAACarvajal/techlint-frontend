export function sanitize(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))
}

export function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function scrollToElement(target, options = { behavior: 'smooth' }) {
  let el = null
  if (typeof target === 'string') {
    el = document.getElementById(target) || document.querySelector(target)
  } else if (target instanceof HTMLElement) {
    el = target
  }

  if (el) el.scrollIntoView(options)
}
