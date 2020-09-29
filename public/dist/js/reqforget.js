/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"reqforget": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./view/reqforget/reqforget.js","react","commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./view/reqforget/reqforget.js":
/*!*************************************!*\
  !*** ./view/reqforget/reqforget.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/_react@16.13.1@react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/_react-dom@16.13.1@react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"./node_modules/_@material-ui_core@4.11.0@@material-ui/core/esm/index.js\");\n/* harmony import */ var _material_ui_lab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/lab */ \"./node_modules/_@material-ui_lab@4.0.0-alpha.56@@material-ui/lab/esm/index.js\");\n/* harmony import */ var _material_ui_icons_LockOpen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/LockOpen */ \"./node_modules/_@material-ui_icons@4.9.1@@material-ui/icons/LockOpen.js\");\n/* harmony import */ var _material_ui_icons_LockOpen__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOpen__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/_axios@0.20.0@axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\nvar App = /*#__PURE__*/function (_React$Component) {\n  _inherits(App, _React$Component);\n\n  var _super = _createSuper(App);\n\n  function App() {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _super.call(this);\n\n    _defineProperty(_assertThisInitialized(_this), \"checkPasswordAndEmail\", function () {\n      var password = _this.state.password;\n      var confirmPassword = _this.state.confirmPassword;\n      var email = _this.state.email;\n\n      if (email === '') {\n        _this.showError(\"Need to fill the EMAIL\");\n\n        return false;\n      } else if (password.length < 8) {\n        _this.showError(\"PASSWORD should be at leasr 8 characters\");\n\n        return false;\n      } else if (password !== confirmPassword) {\n        _this.showError(\"PASSWORD and CONFIRMED PASSWORD should be same\");\n\n        return false;\n      } else {\n        return true;\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"checkAuthCode\", function () {\n      var authCode = _this.state.authCode;\n\n      if (authCode === undefined || authCode === '') {\n        _this.showError(\"Need to fill in AUTHCODE\");\n\n        return false;\n      } else {\n        return true;\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"submit\", function () {\n      if (_this.checkPasswordAndEmail() && _this.checkAuthCode()) {\n        axios__WEBPACK_IMPORTED_MODULE_5___default.a.post(\"./forgetAndChangePassword.action\", JSON.stringify({\n          email: _this.state.email,\n          password: _this.state.password,\n          confirmPassword: _this.state.confirmPassword,\n          authCode: _this.state.authCode\n        }), {\n          headers: {\n            'Content-Type': 'application/json;charset=UTF-8'\n          }\n        }).then(function (res) {\n          if (res.data.successFlag) {\n            _this.setState({\n              alert: {\n                display: \"inline\",\n                message: \"Change password successfully! After 3s, jump to login page!\",\n                flag: true\n              }\n            });\n\n            setTimeout(function () {\n              window.location.href = './reqlogin.html';\n            }, 3 * 1000);\n          } else {\n            _this.showError(res.data.message);\n          }\n        })[\"catch\"](function (err) {\n          console.log(err);\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"getAuthCode\", function () {\n      var email = _this.state.email;\n\n      if (_this.checkPasswordAndEmail()) {\n        axios__WEBPACK_IMPORTED_MODULE_5___default.a.get(\"./forgetPassword.action/\" + email).then(function (res) {\n          if (res.data.successFlag) {\n            _this.setState({\n              codebuttonStatus: false\n            });\n\n            var self = _assertThisInitialized(_this);\n\n            setTimeout(function () {\n              self.setState({\n                codebuttonStatus: true\n              });\n            }, 30 * 1000);\n          } else {\n            _this.showError(res.data.message);\n          }\n        })[\"catch\"](function (err) {\n          console.log(err);\n        });\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"showError\", function (message) {\n      _this.setState({\n        alert: {\n          display: \"inline\",\n          message: message,\n          flag: false\n        }\n      });\n    });\n\n    _this.state = {\n      email: '',\n      password: '',\n      confirmPassword: '',\n      authCode: '',\n      codebuttonStatus: true,\n      //avaliable\n      alert: {\n        display: \"none\",\n        message: '',\n        flag: true\n      }\n    };\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        container: true\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 3\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 6\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Card\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"CardContent\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Box\"], {\n        style: {\n          display: 'flex',\n          flexDirection: 'column',\n          alignItems: 'center'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Avatar\"], {\n        style: {\n          background: '#FE6B8B'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LockOpen__WEBPACK_IMPORTED_MODULE_4___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Typography\"], {\n        component: \"h1\",\n        variant: \"h5\",\n        style: {\n          margin: '5px auto'\n        }\n      }, \"ICrowdTask Forget Password\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Typography\"], {\n        component: \"h2\",\n        variant: \"body2\",\n        style: {\n          margin: '5px auto'\n        }\n      }, \"Please fill in your email and new password. Then click the \\\"Get Auth Code\\\" button, you can find the code in your mailbox. Fill back the auth code, then click \\\"Finish\\\" button.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab__WEBPACK_IMPORTED_MODULE_3__[\"Alert\"], {\n        style: {\n          display: \"\".concat(this.state.alert.display)\n        },\n        severity: this.state.alert.flag ? \"success\" : \"error\"\n      }, this.state.alert.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        noValidate: true\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        container: true\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 12\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"TextField\"], {\n        variant: \"outlined\",\n        margin: \"normal\",\n        required: true,\n        fullWidth: true,\n        id: \"email\",\n        label: \"Email\",\n        name: \"email\",\n        autoComplete: \"email\",\n        value: this.state.email,\n        onChange: function onChange(e) {\n          _this2.setState({\n            email: e.target.value\n          });\n        },\n        autoFocus: true\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 12\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"TextField\"], {\n        variant: \"outlined\",\n        margin: \"normal\",\n        required: true,\n        fullWidth: true,\n        id: \"password\",\n        label: \"Password\",\n        name: \"password\",\n        autoComplete: \"password\",\n        type: \"password\",\n        value: this.state.password,\n        onChange: function onChange(e) {\n          _this2.setState({\n            password: e.target.value\n          });\n        }\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 12\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"TextField\"], {\n        variant: \"outlined\",\n        margin: \"normal\",\n        required: true,\n        fullWidth: true,\n        id: \"confirmPassword\",\n        label: \"Confirm password\",\n        name: \"confirmPassword\",\n        autoComplete: \"confirmPassword\",\n        type: \"password\",\n        value: this.state.confirmPassword,\n        onChange: function onChange(e) {\n          _this2.setState({\n            confirmPassword: e.target.value\n          });\n        }\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n        fullWidth: true,\n        variant: \"contained\",\n        color: \"secondary\",\n        onClick: this.getAuthCode,\n        disabled: !this.state.codebuttonStatus\n      }, this.state.codebuttonStatus ? \"Get Auth Code\" : \"Wait for 30s to try agin, please.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 12\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"TextField\"], {\n        variant: \"outlined\",\n        margin: \"normal\",\n        required: true,\n        fullWidth: true,\n        id: \"authCode\",\n        label: \"Auth Code\",\n        name: \"authCode\",\n        autoComplete: \"address\",\n        value: this.state.authCode,\n        onChange: function onChange(e) {\n          _this2.setState({\n            authCode: e.target.value\n          });\n        }\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n        fullWidth: true,\n        variant: \"contained\",\n        color: \"primary\",\n        onClick: this.submit\n      }, \"Finish\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Grid\"], {\n        item: true,\n        xs: 3\n      }));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./view/reqforget/reqforget.js?");

/***/ })

/******/ });