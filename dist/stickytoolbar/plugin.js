/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var plugin = function plugin(editor) {
  var offset = editor.settings.sticky_offset ? editor.settings.sticky_offset : 0;

  editor.on('init', function () {
    setSticky();
  });

  window.addEventListener('scroll', function () {
    setSticky();
  });

  function setSticky() {
    if (!editor.inline) {
      var container = editor.getContainer(),
          menubar = container.querySelector('.mce-menubar'),
          statusbar = container.querySelector('.mce-statusbar'),
          toolbar = container.querySelector('.mce-toolbar-grp');

      if (isSticky()) {
        if (menubar) {
          container.style.paddingTop = toolbar.offsetHeight + menubar.offsetHeight + 'px';
        } else {
          container.style.paddingTop = toolbar.offsetHeight + 'px';
        }

        if (isAtBottom()) {
          if (menubar) {
            menubar.style.top = null;
            menubar.style.borderBottom = null;

            menubar.style.bottom = statusbar.offsetHeight + toolbar.offsetHeight + 'px';
            menubar.style.position = 'absolute';
            menubar.style.width = '100%';
          }

          toolbar.style.top = null;
          toolbar.style.borderBottom = null;

          toolbar.style.bottom = statusbar.offsetHeight + 'px';
          toolbar.style.position = 'absolute';
          toolbar.style.width = '100%';
        } else {
          if (menubar) {
            menubar.style.bottom = null;

            menubar.style.top = offset + 'px';
            menubar.style.position = 'fixed';
            menubar.style.width = container.clientWidth + 'px';
            menubar.style.backgroundColor = '#f0f0f0';
          }

          toolbar.style.bottom = null;

          toolbar.style.top = (menubar ? menubar.offsetHeight + offset : offset) + 'px';
          toolbar.style.position = 'fixed';
          toolbar.style.width = container.clientWidth + 'px';
          toolbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
        }
      } else {
        container.style.paddingTop = 0;

        if (menubar) {
          menubar.style.position = 'relative';
          menubar.style.top = null;
          menubar.style.width = null;
          menubar.style.borderBottom = null;
        }
        toolbar.style.position = 'relative';
        toolbar.style.top = null;
        toolbar.style.width = null;
        toolbar.style.borderBottom = null;
      }
    }
  }

  function isSticky() {
    var editorPosition = editor.getContainer().getBoundingClientRect().top;

    if (editorPosition < offset) {
      return true;
    }

    return false;
  }

  function isAtBottom() {
    var container = editor.getContainer(),
        editorPosition = container.getBoundingClientRect().top,
        menubar = container.querySelector('.mce-menubar');

    var statusbarHeight = container.querySelector('.mce-statusbar').offsetHeight,
        toolbarHeight = container.querySelector('.mce-toolbar-grp').offsetHeight;

    var menubarHeight = menubar ? menubar.offsetHeight : 0;

    var stickyHeight = -(container.offsetHeight - menubarHeight - statusbarHeight - toolbarHeight);

    if (editorPosition < stickyHeight + offset) {
      return true;
    }

    return false;
  }
};

exports.default = plugin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _plugin = __webpack_require__(0);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

tinymce.PluginManager.add('stickytoolbar', _plugin2.default);

/***/ })
/******/ ]);