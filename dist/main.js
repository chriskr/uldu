module.exports =
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
    Copyright 2017 Christian Krebs

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

var TEXT_NODE_NAME = '#text';
var NAMESPACES = {
  svg: 'http://www.w3.org/2000/svg'
};
var OBJECT_TYPE_NAME = '[object Object]';
var STRING_TYPE_NAME = 'string';
var toString = Function.prototype.call.bind(Object.prototype.toString);
var isDictionary = function isDictionary(obj) {
  return toString(obj) === OBJECT_TYPE_NAME;
};
var isString = function isString(str) {
  return (typeof str === 'undefined' ? 'undefined' : _typeof(str)) === STRING_TYPE_NAME;
};
var isTextNodeName = function isTextNodeName(str) {
  return str === TEXT_NODE_NAME;
};

var createDom = function createDom(tmpl) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var ELE_NAME = 0;
  var ATTRS = 1;
  var elementName = tmpl[ELE_NAME];
  var ele = null;
  var i = 0;
  if (isString(elementName) && !isTextNodeName(elementName)) {
    i++;
    if (elementName.includes(':')) {
      var pos = elementName.indexOf(':');
      namespace = NAMESPACES[elementName.slice(0, pos)];
      ele = document.createElementNS(namespace, elementName.slice(pos + 1));
    } else {
      ele = document.createElement(elementName);
    }
    var attrs = tmpl[ATTRS];
    if (isDictionary(attrs)) {
      i++;
      for (var prop in attrs) {
        var value = attrs[prop];
        if (isString(value)) {
          ele.setAttribute(prop, value);
        }
      }
    }
  } else {
    if (isTextNodeName(elementName)) {
      i++;
    }
    ele = document.createDocumentFragment();
  }
  for (; i < tmpl.length; i++) {
    var item = tmpl[i];
    if (isString(item)) {
      ele.appendChild(document.createTextNode(item));
    } else if (item) {
      ele.appendChild(createDom(item), namespace);
    }
  }
  return ele;
};

var render = function render(templ, ele) {
  return ele.appendChild(createDom(templ));
};
var renderClean = function renderClean(templ, ele) {
  ele.textContent = '';
  return render(templ, ele);
};

exports.NAMESPACES = NAMESPACES;
exports.TEXT_NODE_NAME = TEXT_NODE_NAME;
exports.createDom = createDom;
exports.render = render;
exports.renderClean = renderClean;

/***/ })
/******/ ]);