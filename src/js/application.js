
/**
 * @project:  ideo-static-site-boilerplate
 * @author:   ideonetwork (@ideonetwork)
 * Copyright (c) 2017 ideonetwork
 * Released under the MIT license (http://mit-license.org)
*/
"use strict";/* exported Util */var Util=function(){var init=function init(){};return{init:init};}();
'use strict';/* global Util */var Application=function(){var init=function init(){document.documentElement.className='js';document.addEventListener('DOMContentLoaded',function(){Util.init();window.addEventListener('resize',function(){console.log('resizing');},200);});window.addEventListener('load',function(){});};return{start:init};}();Application.start();
//# sourceMappingURL=application.js.map
