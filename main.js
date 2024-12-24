/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameboard: () => (/* binding */ gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nclass gameboard{\n    constructor(x){\n        this.x = x;\n        this.board = Array.from({ length: x }, () => Array(x).fill([0,0]));\n        this.ships = [];\n        this.sunkShips = 0;\n        this.generateBoard(x);\n    }\n    generateBoard(x){\n        const gameboard = document.querySelector('.gameboard');\n        for (let i = 0; i < x; i++) {\n            for (let j = 0; j < x; j++) {\n                const cell = document.createElement('div');\n                cell.classList.add('cell');\n                gameboard.appendChild(cell);\n            }\n        }\n    }\n    place_ship(sti,eni){\n        let ship = new _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ships.length,0,sti,eni);\n        this.ships.push_back(ship);\n        let idx = this.ships.length-1;\n        ship.idx = idx;\n        let st = ship.st_coor;\n        let en = ship.en_coor;\n        let orien = ship.orientation;\n        if (st[0] < 0 || st[0] >= this.x || st[1] < 0 || st[1] >= this.x || en[0] < 0 || en[0] >= this.x || en[1] < 0 || en[1] >= this.x) {\n            throw new Error(\"Ship coordinates are out of bounds\");\n        }\n        if (orien === 'horizontal') {\n            for (let i = st[1]; i <= en[1]; i++) {\n                if(this.board[st[0]][i][0]==1)\n                    throw new Error(\"Ships cannot overlap\");\n                this.board[st[0]][i] = [1,idx];\n            }\n        } else if (orien === 'vertical') {\n            for (let i = st[0]; i <= en[0]; i++) {\n                if(this.board[i][st[1]][0]==1)\n                    throw new Error(\"Ships cannot overlap\");\n                this.board[i][st[1]] = [1,idx];\n            }\n        }\n        return true;\n    }\n    gameOver(){\n        if(this.sunkShips == this.ships.length){\n            return true;\n        }\n        else false;\n    }\n    showResult(){\n\n    }\n    receiveAttack(pos){\n        let x = pos[0];\n        let y = pos[1];\n        if(this.board[x][y][0]==1){\n            let ship = this.board[x][y][1];\n            ship.isHit();\n            if(ship.isSunk()){\n                this.sunkShips++;\n                if(this.gameOver()){\n                    this.showResult();\n                }\n            }\n            this.board[x][y][0]=0;\n            showBlue(x,y);\n            return true;\n        }else{\n            showRed(x,y);\n            return false;\n        }\n    }\n}\n\n//# sourceURL=webpack://webpack-prac/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\n\nconst player1 = new _player_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('Player 1');\nconst player2 = new _player_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('Computer',\"computer\");\n\nconst player1Board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameboard(8);\nconst player2Board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.gameboard(8);\n\n// Make it draggable \n\n//Give 5 boats to player\n\n\n//# sourceURL=webpack://webpack-prac/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\n\nclass Player{\n    constructor(name,type = \"player\"){\n        this.name = name;\n        this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboard(8);\n        this.ships = [];\n        this.type = type;\n    }\n    placeShip(ship, x, y, direction) {\n        if (this.gameboard.placeShip(ship, x, y, direction)) {\n            this.ships.push(ship);\n            return true;\n        }\n        return false;\n    }\n\n    receiveAttack(x, y) {\n        return this.gameboard.receiveAttack([x, y]);\n    }\n\n    allShipsSunk() {\n        return this.ships.every(ship => ship.isSunk());\n    }\n}\n\n//# sourceURL=webpack://webpack-prac/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship{\n    constructor(idx,hits,st_coor,en_coor){\n        this.idx = idx;\n        this.hits = hits;\n        this.sunk = false;\n        this.st_coor = st_coor;\n        this.en_coor = en_coor;\n        this.orientation = \"horizontal\"\n    }\n    isHit(){\n        if(this.sunk==true)return false;\n        this.hits++;\n        if(this.hits==this.len){\n            this.sunk =true;\n        }\n        return true;\n    }\n    isSunk(){\n        return this.sunk;\n    }\n}\n\n//# sourceURL=webpack://webpack-prac/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;