const cl = (function cl() {
  const hasClass = function hasClass(elem, className) {
    return elem.classList.contains(className)
  }

  const addClass = function addClass(elem, className) {
    elem.classList.add(className)
  }

  const removeClass = function removeClass(elem, className) {
    elem.classList.remove(className)
  }

  const toggleClass = function toggleClass(elem, className) {
    const fn = hasClass(elem, className) ? removeClass : addClass
    fn(elem, className)
  }

  return {
    hasClass,
    addClass,
    removeClass,
    toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass,
  }
}())
