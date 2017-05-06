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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = canvasResize;
// https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
function canvasResize (canvas) {
  // Lookup the size the browser is displaying the canvas.
  const display = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }

  // Check if the canvas is not the same size.
  if (unlikeWidthAndHeight(canvas, display)) {
    // Make the canvas the same size
    canvas.width = display.width
    canvas.height = display.height
  }

  return display
}

function unlikeWidthAndHeight (src, tgt) {
  return src.width !== tgt.width || src.height !== tgt.height
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hardcoverWidthClipspace;
// Thanks to http://stackoverflow.com/a/22948794/1363799
const BOOK_ASPECT_RATIO = 0.71 // from http://artgorbunov.ru/projects/book-ui/

function hardcoverWidthClipspace (canvasWidth, canvasHeight) {
  const hardcoverWidthPixels = canvasHeight * BOOK_ASPECT_RATIO
  const hardcoverWidthRelativeToCanvas = hardcoverWidthPixels / canvasWidth

  // Proportion:
  // hardcoverWidthRelativeToCanvas -- x
  //                              1 -- 2
  return hardcoverWidthRelativeToCanvas * 2
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createProgram;
// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
function createProgram (gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const isCreated = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (isCreated) {
    return program
  }

  console.error(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rectangleAdd;
// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
function rectangleAdd ({gl, x, y, width, height}) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y - height

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ]),
    gl.STATIC_DRAW
  )
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createShader;
// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
function createShader (gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const isCreated = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (isCreated) {
    return shader
  }

  console.error(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html\r\n\r\n// fragment shaders don't have a default precision so we need\r\n// to pick one. mediump is a good default. It means \"medium precision\"\r\nprecision mediump float;\r\n\r\nuniform vec4 u_color;\r\n \r\nvoid main() {\r\n  // gl_FragColor is a special variable a fragment shader\r\n  // is responsible for setting\r\n  gl_FragColor = u_color;\r\n}\r\n"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html\r\n\r\n// an attribute will receive data from a buffer\r\nattribute vec4 a_position;\r\n \r\n// all shaders have a main function\r\nvoid main() {\r\n \r\n  // gl_Position is a special variable a vertex shader\r\n  // is responsible for setting\r\n  gl_Position = a_position;\r\n}\r\n"

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Copyright 2016, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of his
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


(function(root, factory) {  // eslint-disable-line
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return factory.call(root);
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.webglLessonsUI = factory.call(root);
  }
}(this, function() {

  function setupSlider(selector, options) {
    var parent = document.querySelector(selector);
    if (!parent) {
      return; // like jquery don't fail on a bad selector
    }
    if (!options.name) {
      options.name = selector.substring(1);
    }
    return createSlider(parent, options);
  }

  function createSlider(parent, options) {
    var precision = options.precision || 0;
    var min = options.min || 0;
    var step = options.step || 1;
    var value = options.value || 0;
    var max = options.max || 1;
    var fn = options.slide;
    var name = options.name;
    var uiPrecision = options.uiPrecision === undefined ? precision : options.uiPrecision;
    var uiMult = options.uiMult || 1;

    min /= step;
    max /= step;
    value /= step;

    parent.innerHTML = `
      <div class="gman-widget-outer">
        <div class="gman-widget-label">${name}</div>
        <div class="gman-widget-value"></div>
        <input class="gman-widget-slider" type="range" min="${min}" max="${max}" value="${value}" />
      </div>
    `;
    var valueElem = parent.querySelector(".gman-widget-value");
    var sliderElem = parent.querySelector(".gman-widget-slider");

    function updateValue(value) {
      valueElem.textContent = (value * step * uiMult).toFixed(uiPrecision);
    }

    updateValue(value);

    function handleChange(event) {
      var value = parseInt(event.target.value);
      updateValue(value);
      fn(event, { value: value * step });
    }

    sliderElem.addEventListener('input', handleChange);
    sliderElem.addEventListener('change', handleChange);

    return {
      elem: parent,
      updateValue: (v) => {
        v /= step;
        sliderElem.value = v;
        updateValue(v);
      },
    };
  }

  function makeSlider(options) {
    const div = document.createElement("div");
    return createSlider(div, options);
  }

  var widgetId = 0;
  function getWidgetId() {
    return "__widget_" + widgetId++;
  }

  function makeCheckbox(options) {
    const div = document.createElement("div");
    div.className = "gman-widget-outer";
    const label = document.createElement("label");
    const id = getWidgetId();
    label.setAttribute('for', id);
    label.textContent = options.name;
    label.className = "gman-checkbox-label";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = options.value;
    input.id = id;
    input.className = "gman-widget-checkbox";
    div.appendChild(label);
    div.appendChild(input);
    input.addEventListener('change', function(e) {
       options.change(e, {
         value: e.target.checked,
       });
    });

    return {
      elem: div,
      updateValue: function(v) {
        input.checked = !!v;
      },
    };
  }

  function makeOption(options) {
    const div = document.createElement("div");
    div.className = "gman-widget-outer";
    const label = document.createElement("label");
    const id = getWidgetId();
    label.setAttribute('for', id);
    label.textContent = options.name;
    label.className = "gman-widget-label";
    const selectElem = document.createElement("select");
    options.options.forEach((name, ndx) => {
      const opt = document.createElement("option");
      opt.textContent = name;
      opt.value = ndx;
      opt.selected = ndx === options.value
      selectElem.appendChild(opt);
    });
    selectElem.className = "gman-widget-select";
    div.appendChild(label);
    div.appendChild(selectElem);
    selectElem.addEventListener('change', function(e) {
       options.change(e, {
         value: selectElem.selectedIndex,
       });
    });

    return {
      elem: div,
      updateValue: function(v) {
        selectedElem.selectedIndex = v;
      },
    };
  }

  function noop() {
  }

  function genSlider(object, ui) {
    const changeFn = ui.change || noop;
    ui.name = ui.name || ui.key;
    ui.value = object[ui.key];
    ui.slide = ui.slide || function(event, uiInfo) {
      object[ui.key] = uiInfo.value;
      changeFn();
    };
    return makeSlider(ui);
  }

  function genCheckbox(object, ui) {
    const changeFn = ui.change || noop;
    ui.value = object[ui.key];
    ui.name = ui.name || ui.key;
    ui.change = function(event, uiInfo) {
      object[ui.key] = uiInfo.value;
      changeFn();
    };
    return makeCheckbox(ui);
  }

  function genOption(object, ui) {
    const changeFn = ui.change || noop;
    ui.value = object[ui.key];
    ui.name = ui.name || ui.key;
    ui.change = function(event, uiInfo) {
      object[ui.key] = uiInfo.value;
      changeFn();
    };
    return makeOption(ui);
  }

  const uiFuncs = {
    slider: genSlider,
    checkbox: genCheckbox,
    option: genOption,
  };

  function setupUI(parent, object, uiInfos) {
    const widgets = {};
    uiInfos.forEach(function(ui) {
      const widget = uiFuncs[ui.type](object, ui);
      parent.appendChild(widget.elem);
      widgets[ui.key] = widget;
    });
    return widgets;
  }

  function updateUI(widgets, data) {
    Object.keys(widgets).forEach(key => {
      const widget = widgets[key];
      widget.updateValue(data[key]);
    });
  }

  return {
    setupUI: setupUI,
    updateUI: updateUI,
    setupSlider: setupSlider,
    makeSlider: makeSlider,
    makeCheckbox: makeCheckbox,
  };

}));



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shaderVertex_glsl__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shaderVertex_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__shaderVertex_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shaderFragment_glsl__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shaderFragment_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__shaderFragment_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shaderCreate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__programCreate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__canvasResize__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rectangleAdd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hardcoverWidthClipspace__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_webgl_fundamentals_webgl_resources_webgl_lessons_ui__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_webgl_fundamentals_webgl_resources_webgl_lessons_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__node_modules_webgl_fundamentals_webgl_resources_webgl_lessons_ui__);
// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html











/**
 * Initialization
 */

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl')

// create GLSL shaders, upload the GLSL source, compile the shaders
const vertexShader = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shaderCreate__["a" /* default */])(
  gl, gl.VERTEX_SHADER, __WEBPACK_IMPORTED_MODULE_0__shaderVertex_glsl___default.a)

const fragmentShader = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shaderCreate__["a" /* default */])(
  gl, gl.FRAGMENT_SHADER, __WEBPACK_IMPORTED_MODULE_1__shaderFragment_glsl___default.a)

// Link the two shaders into a program
const program = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__programCreate__["a" /* default */])(gl, vertexShader, fragmentShader)

// look up where the vertex data needs to go
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

// look up uniform locations
const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

// Create a buffer and put three 2d clip space points in it
const positionBuffer = gl.createBuffer()

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

// three 2d points
const positions = [
  0, 0,
  0, 0.5,
  0.7, 0
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

const actualTranslation = drawScene()

// Setup UI
__WEBPACK_IMPORTED_MODULE_7__node_modules_webgl_fundamentals_webgl_resources_webgl_lessons_ui___default.a.setupSlider('#x', {slide: updatePosition(0), min: -1, step: 0.01, max: 1, precision: 3, value: actualTranslation[0]})
__WEBPACK_IMPORTED_MODULE_7__node_modules_webgl_fundamentals_webgl_resources_webgl_lessons_ui___default.a.setupSlider('#y', {slide: updatePosition(1), min: -1, step: 0.01, max: 1, precision: 3, value: actualTranslation[1]})

function updatePosition (index) {
  return function (event, ui) {
    actualTranslation[index] = ui.value
    drawScene(actualTranslation)
  }
}

/**
 * Rendering
 */

// https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
/* eslint-disable max-statements */
function drawScene (translation) {
  // Set canvas and viewport size
  const viewport = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__canvasResize__["a" /* default */])(gl.canvas)
  gl.viewport(0, 0, viewport.width, viewport.height)

  // Set up hardcover dimensions, position and color
  const hardcoverWidth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__hardcoverWidthClipspace__["a" /* default */])(
    viewport.width,
    viewport.height)
  const hardcoverHeight = 2 // Full canvas width
  const hardcoverTranslation = translation || [
    -hardcoverWidth / 2, // move left from center by half of hardcover width
    0.8 // from http://artgorbunov.ru/projects/book-ui/
  ]
  // RGBA(254, 116, 40, 1) - color of http://artgorbunov.ru/projects/book-ui/
  const hardcoverColor = new Float32Array([254 / 255, 116 / 255, 40 / 255, 1])

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Tell canvas to use our program (pair of shaders)
  gl.useProgram(program)

  // tell WebGL how to take data from the buffer we setup above
  // and supply it to the attribute in the shader
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation)

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__rectangleAdd__["a" /* default */])({
    gl,
    x: hardcoverTranslation[0],
    y: hardcoverTranslation[1],
    width: hardcoverWidth,
    height: hardcoverHeight
  })

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2          // 2 components per iteration
  const normalize = false // don't normalize the data
  const bufferOffset = 0  // start at the beginning of the buffer
  const type = gl.FLOAT   // the data is 32bit floats
  const stride = 0        // 0 = move forward size * sizeof(type) each iteration
                          // to get the next position
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, bufferOffset)

  // Set color
  gl.uniform4fv(colorUniformLocation, hardcoverColor)

  // Draw passet atributes
  const primitiveType = gl.TRIANGLES
  const drawOffset = 0
  const count = 6
  gl.drawArrays(primitiveType, drawOffset, count)

  console.log('drawn')
  return hardcoverTranslation
}
/* eslint-enable max-statements */


/***/ })
/******/ ]);
//# sourceMappingURL=hardcover-bundle.js.map