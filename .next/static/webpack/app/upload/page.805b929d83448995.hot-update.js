"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/upload/page",{

/***/ "(app-pages-browser)/./app/components/UploadForm.tsx":
/*!***************************************!*\
  !*** ./app/components/UploadForm.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ UploadForm; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.tsx\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction UploadForm() {\n    _s();\n    const { register, handleSubmit, formState: { errors } } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)();\n    const onSubmit = (data)=>{\n        console.log(data);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        onSubmit: handleSubmit(onSubmit),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                htmlFor: \"firstName\",\n                children: \"First Name\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_1__.Input, {\n                id: \"firstName\",\n                ...register(\"firstName\", {\n                    required: \"First Name is required\"\n                }),\n                placeholder: \"Enter your first name\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                htmlFor: \"lastInitial\",\n                children: \"Last Initial\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_1__.Input, {\n                id: \"lastInitial\",\n                ...register(\"lastInitial\", {\n                    required: \"Last Initial is required\"\n                }),\n                placeholder: \"Enter your last initial\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                type: \"submit\",\n                children: \"Submit\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n_s(UploadForm, \"cSudtlZF25wA1QXS6hk7TRnoNuU=\", false, function() {\n    return [\n        react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm\n    ];\n});\n_c = UploadForm;\nvar _c;\n$RefreshReg$(_c, \"UploadForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL1VwbG9hZEZvcm0udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUU2QztBQUNIO0FBRTNCLFNBQVNFOztJQUN0QixNQUFNLEVBQUVDLFFBQVEsRUFBRUMsWUFBWSxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sRUFBRSxFQUFFLEdBQUdMLHdEQUFPQTtJQUVqRSxNQUFNTSxXQUFXLENBQUNDO1FBQ2hCQyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ0c7UUFBS0osVUFBVUgsYUFBYUc7OzBCQUUzQiw4REFBQ0s7Z0JBQU1DLFNBQVE7MEJBQVk7Ozs7OzswQkFDM0IsOERBQUNiLHVEQUFLQTtnQkFDSmMsSUFBRztnQkFDRixHQUFHWCxTQUFTLGFBQWE7b0JBQUVZLFVBQVU7Z0JBQXlCLEVBQUU7Z0JBQ2pFQyxhQUFZOzs7Ozs7MEJBS2QsOERBQUNKO2dCQUFNQyxTQUFROzBCQUFjOzs7Ozs7MEJBQzdCLDhEQUFDYix1REFBS0E7Z0JBQ0pjLElBQUc7Z0JBQ0YsR0FBR1gsU0FBUyxlQUFlO29CQUFFWSxVQUFVO2dCQUEyQixFQUFFO2dCQUNyRUMsYUFBWTs7Ozs7OzBCQUtkLDhEQUFDQztnQkFBT0MsTUFBSzswQkFBUzs7Ozs7Ozs7Ozs7O0FBRzVCO0dBL0J3QmhCOztRQUNvQ0Qsb0RBQU9BOzs7S0FEM0NDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL1VwbG9hZEZvcm0udHN4PzJkNjYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvaW5wdXRcIlxuaW1wb3J0IHsgdXNlRm9ybSB9IGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVwbG9hZEZvcm0oKSB7XG4gIGNvbnN0IHsgcmVnaXN0ZXIsIGhhbmRsZVN1Ym1pdCwgZm9ybVN0YXRlOiB7IGVycm9ycyB9IH0gPSB1c2VGb3JtKCk7XG5cbiAgY29uc3Qgb25TdWJtaXQgPSAoZGF0YTogYW55KSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0KG9uU3VibWl0KX0+XG4gICAgICB7LyogRmlyc3QgTmFtZSAqL31cbiAgICAgIDxsYWJlbCBodG1sRm9yPVwiZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICA8SW5wdXRcbiAgICAgICAgaWQ9XCJmaXJzdE5hbWVcIlxuICAgICAgICB7Li4ucmVnaXN0ZXIoJ2ZpcnN0TmFtZScsIHsgcmVxdWlyZWQ6ICdGaXJzdCBOYW1lIGlzIHJlcXVpcmVkJyB9KX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIGZpcnN0IG5hbWVcIlxuICAgICAgLz5cbiAgICAgIHsvKiB7ZXJyb3JzLmZpcnN0TmFtZSAmJiA8c3Bhbj57ZXJyb3JzLmZpcnN0TmFtZS5tZXNzYWdlfTwvc3Bhbj59ICovfVxuXG4gICAgICB7LyogTGFzdCBJbml0aWFsICovfVxuICAgICAgPGxhYmVsIGh0bWxGb3I9XCJsYXN0SW5pdGlhbFwiPkxhc3QgSW5pdGlhbDwvbGFiZWw+XG4gICAgICA8SW5wdXRcbiAgICAgICAgaWQ9XCJsYXN0SW5pdGlhbFwiXG4gICAgICAgIHsuLi5yZWdpc3RlcignbGFzdEluaXRpYWwnLCB7IHJlcXVpcmVkOiAnTGFzdCBJbml0aWFsIGlzIHJlcXVpcmVkJyB9KX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIGxhc3QgaW5pdGlhbFwiXG4gICAgICAvPlxuICAgICAgey8qIHtlcnJvcnMubGFzdEluaXRpYWwgJiYgPHNwYW4+e2Vycm9ycy5sYXN0SW5pdGlhbC5tZXNzYWdlfTwvc3Bhbj59ICovfVxuXG4gICAgICBcbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJJbnB1dCIsInVzZUZvcm0iLCJVcGxvYWRGb3JtIiwicmVnaXN0ZXIiLCJoYW5kbGVTdWJtaXQiLCJmb3JtU3RhdGUiLCJlcnJvcnMiLCJvblN1Ym1pdCIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiZm9ybSIsImxhYmVsIiwiaHRtbEZvciIsImlkIiwicmVxdWlyZWQiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiIsInR5cGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/UploadForm.tsx\n"));

/***/ })

});