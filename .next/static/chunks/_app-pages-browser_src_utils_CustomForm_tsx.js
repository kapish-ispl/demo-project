/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["_app-pages-browser_src_utils_CustomForm_tsx"],{

/***/ "(app-pages-browser)/./src/components/Forms lazy recursive ^\\.\\/.*$":
/*!**************************************************************!*\
  !*** ./src/components/Forms/ lazy ^\.\/.*$ namespace object ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./FormField": [
		"(app-pages-browser)/./src/components/Forms/FormField.tsx",
		"_app-pages-browser_src_components_Forms_FormField_tsx"
	],
	"./FormField.tsx": [
		"(app-pages-browser)/./src/components/Forms/FormField.tsx",
		"_app-pages-browser_src_components_Forms_FormField_tsx"
	],
	"./FormFunc": [
		"(app-pages-browser)/./src/components/Forms/FormFunc.ts",
		"_app-pages-browser_src_components_Forms_FormFunc_ts"
	],
	"./FormFunc.ts": [
		"(app-pages-browser)/./src/components/Forms/FormFunc.ts",
		"_app-pages-browser_src_components_Forms_FormFunc_ts"
	],
	"./ProductForm": [
		"(app-pages-browser)/./src/components/Forms/ProductForm.tsx",
		"_app-pages-browser_src_components_Forms_ProductForm_tsx"
	],
	"./ProductForm.tsx": [
		"(app-pages-browser)/./src/components/Forms/ProductForm.tsx",
		"_app-pages-browser_src_components_Forms_ProductForm_tsx"
	],
	"./formschema": [
		"(app-pages-browser)/./src/components/Forms/formschema.tsx",
		"_app-pages-browser_src_components_Forms_formschema_tsx"
	],
	"./formschema.tsx": [
		"(app-pages-browser)/./src/components/Forms/formschema.tsx",
		"_app-pages-browser_src_components_Forms_formschema_tsx"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "(app-pages-browser)/./src/components/Forms lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "(app-pages-browser)/./src/utils/CustomForm.tsx":
/*!**********************************!*\
  !*** ./src/utils/CustomForm.tsx ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dynamic */ \"(app-pages-browser)/./node_modules/next/dist/api/app-dynamic.js\");\n\n\nconst FallbackForm = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"Form Does Not Exist\"\n    }, void 0, false, {\n        fileName: \"D:\\\\jsp_projects_v2\\\\src\\\\utils\\\\CustomForm.tsx\",\n        lineNumber: 12,\n        columnNumber: 24\n    }, undefined)\n}, void 0, false);\nconst CustomForm = (param)=>{\n    let { component, pageTitle } = param;\n    const PostComponentRender = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(()=>__webpack_require__(\"(app-pages-browser)/./src/components/Forms lazy recursive ^\\\\.\\\\/.*$\")(\"./\".concat(component)).then((mod)=>mod).catch(()=>({\n                default: FallbackForm\n            })), {\n        loading: ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading form...\"\n            }, void 0, false, {\n                fileName: \"D:\\\\jsp_projects_v2\\\\src\\\\utils\\\\CustomForm.tsx\",\n                lineNumber: 21,\n                columnNumber: 28\n            }, undefined),\n        ssr: false\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(PostComponentRender, {\n        pageTitle: pageTitle\n    }, void 0, false, {\n        fileName: \"D:\\\\jsp_projects_v2\\\\src\\\\utils\\\\CustomForm.tsx\",\n        lineNumber: 26,\n        columnNumber: 12\n    }, undefined);\n};\n_c = CustomForm;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomForm);\nvar _c;\n$RefreshReg$(_c, \"CustomForm\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9DdXN0b21Gb3JtLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQW1DO0FBV25DLE1BQU1DLDZCQUFlO2NBQUUsNEVBQUNDO2tCQUFFOzs7Ozs7O0FBRTFCLE1BQU1DLGFBQWE7UUFBQyxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBbUI7SUFDekQsTUFBTUMsc0JBQXNCTix3REFBT0EsQ0FDL0IsSUFDSSw0RkFBTyxLQUFnQyxPQUFWSSxVQUFBQSxDQUFBQSxDQUN4QkcsSUFBSSxDQUFDLENBQUNDLE1BQVFBLEtBQ2RDLEtBQUssQ0FBQyxJQUFPO2dCQUFFQyxTQUFTVDtZQUFhLEtBQzlDO1FBQ0lVLFNBQVMsa0JBQU0sOERBQUNUOzBCQUFFOzs7Ozs7UUFDbEJVLEtBQUs7SUFDVDtJQUdKLHFCQUFPLDhEQUFDTjtRQUFvQkQsV0FBV0E7Ozs7OztBQUMzQztLQWJNRjtBQWVOLGlFQUFlQSxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJEOlxcanNwX3Byb2plY3RzX3YyXFxzcmNcXHV0aWxzXFxDdXN0b21Gb3JtLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZHluYW1pYyBmcm9tIFwibmV4dC9keW5hbWljXCI7XHJcblxyXG5pbnRlcmZhY2UgRHluYW1pY0NvbXBvbmVudFByb3BzIHtcclxuICAgIHBhZ2VUaXRsZTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQ3VzdG9tRm9ybVByb3BzIHtcclxuICAgIGNvbXBvbmVudDogc3RyaW5nO1xyXG4gICAgcGFnZVRpdGxlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IEZhbGxiYWNrRm9ybSA9IDw+PHA+Rm9ybSBEb2VzIE5vdCBFeGlzdDwvcD48Lz5cclxuXHJcbmNvbnN0IEN1c3RvbUZvcm0gPSAoeyBjb21wb25lbnQsIHBhZ2VUaXRsZSB9OiBDdXN0b21Gb3JtUHJvcHMpID0+IHtcclxuICAgIGNvbnN0IFBvc3RDb21wb25lbnRSZW5kZXIgPSBkeW5hbWljPER5bmFtaWNDb21wb25lbnRQcm9wcz4oXHJcbiAgICAgICAgKCkgPT5cclxuICAgICAgICAgICAgaW1wb3J0KGBAL2NvbXBvbmVudHMvRm9ybXMvJHtjb21wb25lbnR9YClcclxuICAgICAgICAgICAgICAgIC50aGVuKChtb2QpID0+IG1vZClcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiAoeyBkZWZhdWx0OiBGYWxsYmFja0Zvcm0gfSkpLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbG9hZGluZzogKCkgPT4gPHA+TG9hZGluZyBmb3JtLi4uPC9wPixcclxuICAgICAgICAgICAgc3NyOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiA8UG9zdENvbXBvbmVudFJlbmRlciBwYWdlVGl0bGU9e3BhZ2VUaXRsZX0gLz47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21Gb3JtO1xyXG4iXSwibmFtZXMiOlsiZHluYW1pYyIsIkZhbGxiYWNrRm9ybSIsInAiLCJDdXN0b21Gb3JtIiwiY29tcG9uZW50IiwicGFnZVRpdGxlIiwiUG9zdENvbXBvbmVudFJlbmRlciIsInRoZW4iLCJtb2QiLCJjYXRjaCIsImRlZmF1bHQiLCJsb2FkaW5nIiwic3NyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/CustomForm.tsx\n"));

/***/ })

}]);