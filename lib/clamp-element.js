export default function clampElement (el, replacement) {
  const lastWordRegex = /[ .,;!?'‘’“”\-–—]*\s(\S)*$/

  let attempts = 3000

  // Remove words as long as the text overflows
  while (el.scrollHeight > el.clientHeight) {
    // Remove last word
    el.innerHTML = el.innerHTML.replace(lastWordRegex, replacement)

    // Break if there is no more words to remove, and text still overflows
    if (!/ /.test(el.innerHTML)) {
      el.innerHTML = ''
      break
    }

    // Just in case...
    if (attempts-- === 0) {
      throw new Error('v-clamp stack overflow!')
    }
  }
}
