const Application = (function() {
  'use strict';

  const init = function init() {
    document.documentElement.className = 'js';
    document.addEventListener('DOMContentLoaded', () => {
      Util.init();

      window.addEventListener('resize', Util.debounce(() => {
        console.log('resizing');
      }, 200));
    });

    window.addEventListener('load', () => {

    });
  };

  return {
    start: init
  };

}());

Application.start();
