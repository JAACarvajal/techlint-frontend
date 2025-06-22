import { onMounted, onUnmounted, ref } from 'vue'

export function useClickOutside(handler) {
  const elRef = ref(null)

  function handleClick(event) {
    if (elRef.value && !elRef.value.contains(event.target)) {
      handler(event)
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClick)
    document.removeEventListener('touchstart', handleClick)
  })

  return elRef
}
