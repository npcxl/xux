// 点击外部指令
const clickOutsideHandler = (el, binding) => {
  const handler = (e) => {
    if (!el.contains(e.target) && binding.value) {
      binding.value()
    }
  }
  el._clickOutside = handler
  document.addEventListener('click', handler)
}

export const vClickOutside = {
  mounted(el, binding) {
    clickOutsideHandler(el, binding)
  },
  
  updated(el, binding) {
    if (el._clickOutside) {
      document.removeEventListener('click', el._clickOutside)
    }
    clickOutsideHandler(el, binding)
  },
  
  unmounted(el) {
    if (el._clickOutside) {
      document.removeEventListener('click', el._clickOutside)
      delete el._clickOutside
    }
  }
}
