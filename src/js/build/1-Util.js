// addEventListener alias
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn)
}

NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn)
  })
}

// Select the first match only, context is optional
function $1(selector, context) {
  return (context || document).querySelector(selector)
}

// Select a list of matching elements, context is optional
function $(selector, context) {
  return (context || document).querySelectorAll(selector)
}

// forEach method, could be shipped as part of an Object Literal/Module
function each(array, callback, scope) {
  for (let i = 0; i < array.length; i += 1) {
    callback.call(scope, i, array[i])
  }
}

// Goes through each item in the array and ask "Will you work?"
function getSupportedPropertyName(properties) {
  for (let i = 0; i < properties.length; i += 1) {
    if (typeof document.body.style[properties[i]] !== 'undefined') {
      return properties[i]
    }
  }
  return null
}

// Get the current top/left coordinates of an element relative to the document.
function offset(el) {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function whichTransitionEvent() {
  let t
  const el = document.createElement('fakeelement')
  const transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
       return transitions[t]
    }
  }
}
