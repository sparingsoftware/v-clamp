import debounce from './debounce'
import clampElement from './clamp-element'

export default {
  install (Vue, { replacement = '\u2026', debounceTime = 300 }) {
    /*
    * Prepare resize handlers
    */
    const resizeHandlers = {}
    const runHandlers = debounce(() => {
      Object.values(resizeHandlers).forEach(handler => handler())
    }, debounceTime)

    /*
    * Add listeners
    */
    window.addEventListener('resize', runHandlers)
    window.addEventListener('orientationchange', runHandlers)

    /*
    * Register vue directive
    */
    Vue.directive('clamp', {
      bind (el, bindings, vnode) {
        // Add overflow to force diff between clientHeight and scrollHeight
        el.style.overflow = 'hidden'

        // Remove HTML markup
        el.innerHTML = el.innerText

        // Fix Orphans
        el.innerHTML = el.innerHTML.replace(/(\s)([\S])[\s]+/g, '$1$2&nbsp;')

        // Save the original text to restore it on window resize
        const originalText = el.innerHTML

        // Add resize handler
        resizeHandlers[vnode.context._uid] = () => {
          // Restore the original text
          el.innerHTML = originalText

          // Clamp text on resize
          clampElement(el, replacement)
        }
      },
      inserted (el) {
        setTimeout(() => {
          clampElement(el, replacement)
        }, 0)
      },
      unbind (el, bindings, vnode) {
        // Remove resize handler on element destroy
        delete resizeHandlers[vnode.context._uid]
      }
    })
  }
}
