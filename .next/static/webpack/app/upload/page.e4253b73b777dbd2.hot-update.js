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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ UploadForm; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.tsx\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction UploadForm() {\n    _s();\n    const { register, handleSubmit, formState: { errors } } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm)();\n    const onSubmit = (data)=>{\n        console.log(data);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        onSubmit: handleSubmit(onSubmit),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                htmlFor: \"firstName\",\n                children: \"First Name\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_1__.Input, {\n                id: \"firstName\",\n                ...register(\"firstName\", {\n                    required: \"First Name is required\"\n                }),\n                placeholder: \"Enter your first name\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            errors.firstName && errors.firstName.message && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                children: errors.firstName.message.toString()\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 22,\n                columnNumber: 56\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                htmlFor: \"lastInitial\",\n                children: \"Last Initial\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_1__.Input, {\n                id: \"lastInitial\",\n                ...register(\"lastInitial\", {\n                    required: \"Last Initial is required\"\n                }),\n                placeholder: \"Enter your last initial\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            errors.lastInitial && errors.lastInitial.message && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                children: errors.lastInitial.message.toString()\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 31,\n                columnNumber: 60\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                type: \"submit\",\n                children: \"Submit\"\n            }, void 0, false, {\n                fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/michaelgallay/Documents/projects/kiddush-collective/app/components/UploadForm.tsx\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n_s(UploadForm, \"cSudtlZF25wA1QXS6hk7TRnoNuU=\", false, function() {\n    return [\n        react_hook_form__WEBPACK_IMPORTED_MODULE_2__.useForm\n    ];\n});\n_c = UploadForm;\nvar _c;\n$RefreshReg$(_c, \"UploadForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL1VwbG9hZEZvcm0udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUU2QztBQUNIO0FBRTNCLFNBQVNFOztJQUN0QixNQUFNLEVBQUVDLFFBQVEsRUFBRUMsWUFBWSxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sRUFBRSxFQUFFLEdBQUdMLHdEQUFPQTtJQUVqRSxNQUFNTSxXQUFXLENBQUNDO1FBQ2hCQyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ0c7UUFBS0osVUFBVUgsYUFBYUc7OzBCQUUzQiw4REFBQ0s7Z0JBQU1DLFNBQVE7MEJBQVk7Ozs7OzswQkFDM0IsOERBQUNiLHVEQUFLQTtnQkFDSmMsSUFBRztnQkFDRixHQUFHWCxTQUFTLGFBQWE7b0JBQUVZLFVBQVU7Z0JBQXlCLEVBQUU7Z0JBQ2pFQyxhQUFZOzs7Ozs7WUFFYlYsT0FBT1csU0FBUyxJQUFJWCxPQUFPVyxTQUFTLENBQUNDLE9BQU8sa0JBQUksOERBQUNDOzBCQUFNYixPQUFPVyxTQUFTLENBQUNDLE9BQU8sQ0FBQ0UsUUFBUTs7Ozs7OzBCQUd6Riw4REFBQ1I7Z0JBQU1DLFNBQVE7MEJBQWM7Ozs7OzswQkFDN0IsOERBQUNiLHVEQUFLQTtnQkFDSmMsSUFBRztnQkFDRixHQUFHWCxTQUFTLGVBQWU7b0JBQUVZLFVBQVU7Z0JBQTJCLEVBQUU7Z0JBQ3JFQyxhQUFZOzs7Ozs7WUFFYlYsT0FBT2UsV0FBVyxJQUFJZixPQUFPZSxXQUFXLENBQUNILE9BQU8sa0JBQUksOERBQUNDOzBCQUFNYixPQUFPZSxXQUFXLENBQUNILE9BQU8sQ0FBQ0UsUUFBUTs7Ozs7OzBCQUcvRiw4REFBQ0U7Z0JBQU9DLE1BQUs7MEJBQVM7Ozs7Ozs7Ozs7OztBQUc1QjtHQS9Cd0JyQjs7UUFDb0NELG9EQUFPQTs7O0tBRDNDQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9VcGxvYWRGb3JtLnRzeD8yZDY2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2lucHV0XCJcbmltcG9ydCB7IHVzZUZvcm0gfSBmcm9tICdyZWFjdC1ob29rLWZvcm0nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVcGxvYWRGb3JtKCkge1xuICBjb25zdCB7IHJlZ2lzdGVyLCBoYW5kbGVTdWJtaXQsIGZvcm1TdGF0ZTogeyBlcnJvcnMgfSB9ID0gdXNlRm9ybSgpO1xuXG4gIGNvbnN0IG9uU3VibWl0ID0gKGRhdGE6IGFueSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdChvblN1Ym1pdCl9PlxuICAgICAgey8qIEZpcnN0IE5hbWUgKi99XG4gICAgICA8bGFiZWwgaHRtbEZvcj1cImZpcnN0TmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxuICAgICAgPElucHV0XG4gICAgICAgIGlkPVwiZmlyc3ROYW1lXCJcbiAgICAgICAgey4uLnJlZ2lzdGVyKCdmaXJzdE5hbWUnLCB7IHJlcXVpcmVkOiAnRmlyc3QgTmFtZSBpcyByZXF1aXJlZCcgfSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBmaXJzdCBuYW1lXCJcbiAgICAgIC8+XG4gICAgICB7ZXJyb3JzLmZpcnN0TmFtZSAmJiBlcnJvcnMuZmlyc3ROYW1lLm1lc3NhZ2UgJiYgPHNwYW4+e2Vycm9ycy5maXJzdE5hbWUubWVzc2FnZS50b1N0cmluZygpfTwvc3Bhbj59XG5cbiAgICAgIHsvKiBMYXN0IEluaXRpYWwgKi99XG4gICAgICA8bGFiZWwgaHRtbEZvcj1cImxhc3RJbml0aWFsXCI+TGFzdCBJbml0aWFsPC9sYWJlbD5cbiAgICAgIDxJbnB1dFxuICAgICAgICBpZD1cImxhc3RJbml0aWFsXCJcbiAgICAgICAgey4uLnJlZ2lzdGVyKCdsYXN0SW5pdGlhbCcsIHsgcmVxdWlyZWQ6ICdMYXN0IEluaXRpYWwgaXMgcmVxdWlyZWQnIH0pfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgbGFzdCBpbml0aWFsXCJcbiAgICAgIC8+XG4gICAgICB7ZXJyb3JzLmxhc3RJbml0aWFsICYmIGVycm9ycy5sYXN0SW5pdGlhbC5tZXNzYWdlICYmIDxzcGFuPntlcnJvcnMubGFzdEluaXRpYWwubWVzc2FnZS50b1N0cmluZygpfTwvc3Bhbj59XG5cbiAgICAgIFxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgPC9mb3JtPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIklucHV0IiwidXNlRm9ybSIsIlVwbG9hZEZvcm0iLCJyZWdpc3RlciIsImhhbmRsZVN1Ym1pdCIsImZvcm1TdGF0ZSIsImVycm9ycyIsIm9uU3VibWl0IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJmb3JtIiwibGFiZWwiLCJodG1sRm9yIiwiaWQiLCJyZXF1aXJlZCIsInBsYWNlaG9sZGVyIiwiZmlyc3ROYW1lIiwibWVzc2FnZSIsInNwYW4iLCJ0b1N0cmluZyIsImxhc3RJbml0aWFsIiwiYnV0dG9uIiwidHlwZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/UploadForm.tsx\n"));

/***/ })

});