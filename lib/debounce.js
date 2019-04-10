export default function debounce (fn, time) {
  let timeoutId

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, time)
  }
}
