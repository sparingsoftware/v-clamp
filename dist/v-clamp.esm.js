function debounce(fn, time) {
  var timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, time);
  };
}

function clampElement(el) {
  var ellipsisCharacter = "\u2026";
  var lastWordRegex = /[ .,;!?'‘’“”\-–—]*\s(\S)*$/;
  var attempts = 3000; // Remove words as long as the text overflows

  while (el.scrollHeight > el.clientHeight) {
    // Remove last word
    el.innerHTML = el.innerHTML.replace(lastWordRegex, ellipsisCharacter); // Break if there is no more words to remove, and text still overflows

    if (!/ /.test(el.innerHTML)) {
      el.innerHTML = '';
      break;
    } // Just in case...


    if (attempts-- === 0) {
      throw new Error('v-clamp stack overflow!');
    }
  }
}

var vClamp = {
  install: function install(Vue) {
    /*
    * Prepare resize handlers
    */
    var resizeHandlers = {};
    var runHandlers = debounce(function () {
      Object.values(resizeHandlers).forEach(function (handler) {
        return handler();
      });
    }, 300);
    /*
    * Add listeners
    */

    window.addEventListener('resize', runHandlers);
    window.addEventListener('orientationchange', runHandlers);
    /*
    * Register vue directive
    */

    Vue.directive('clamp', {
      bind: function bind(el, bindings, vnode) {
        // Add overflow to force diff between clientHeight and scrollHeight
        el.style.overflow = 'hidden'; // Remove HTML markup

        el.innerHTML = el.innerText; // Fix Orphans

        el.innerHTML = el.innerHTML.replace(/(\s)([\S])[\s]+/g, '$1$2&nbsp;'); // Save the original text to restore it on window resize

        var originalText = el.innerHTML; // Add resize handler

        resizeHandlers[vnode.context._uid] = function () {
          // Restore the original text
          el.innerHTML = originalText; // Clamp text on resize

          clampElement(el);
        };
      },
      inserted: function inserted(el) {
        setTimeout(function () {
          clampElement(el);
        }, 0);
      },
      unbind: function unbind(el, bindings, vnode) {
        // Remove resize handler on element destroy
        delete resizeHandlers[vnode.context._uid];
      }
    });
  }
};

export default vClamp;
