'use strict';var Util=function(){'use strict';var debounce=function debounce(func,wait,immediate){var timeout;return function(){var context=this;var args=arguments;var later=function later(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};};var init=function init(){};return{debounce:debounce,init:init};}();
'use strict';var Application=function(){'use strict';var init=function init(){document.documentElement.className='js';document.addEventListener('DOMContentLoaded',function(){Util.init();window.addEventListener('resize',Util.debounce(function(){console.log('resizing');},200));});window.addEventListener('load',function(){});};return{start:init};}();Application.start();
//# sourceMappingURL=application.js.map
