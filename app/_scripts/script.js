(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.7
 *  23/12/2016
 *
 */

var colours = exports.colours = {
    black: "#000000",
    white: "#FFFFFF",
    green: "#00AA00",
    blue: "#0000AA"
};

var tileSize = exports.tileSize = 20;

var tilesWide = exports.tilesWide = 40,
    tilesHigh = exports.tilesHigh = 30;

var canvasProperties = exports.canvasProperties = {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    centerPoint: {
        x: tileSize * tilesWide / 2 - tileSize / 2,
        y: tileSize * tilesHigh / 2 - tileSize / 2
    }
};

var fps = exports.fps = 60;
var actionTimeoutLimit = exports.actionTimeoutLimit = 2;


},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*
 *
 *  XL RPG/Enemy
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
 *
 */

var Enemy = function () {
    function Enemy(name, baseHP, baseAttack, baseDefence, baseSpeed, variance) {
        _classCallCheck(this, Enemy);

        this.name = name;

        this.HP = this.calculateStats(variance, baseHP);
        this.attack = this.calculateStats(variance, baseAttack);
        this.defence = this.calculateStats(variance, baseDefence);
        this.speed = this.calculateStats(variance, baseSpeed);

        console.log(this);
    }

    _createClass(Enemy, [{
        key: "calculateStats",
        value: function calculateStats(variance, baseValue) {
            var signum = 1,
                deviation = Math.random() * variance;

            if (Math.random() > 0.5) signum = -1;

            return baseValue + deviation * signum;
        }
    }]);

    return Enemy;
}();

exports.Enemy = Enemy;


},{}],3:[function(require,module,exports){
"use strict";

var _slime = require("./slime");

var _slime2 = _interopRequireDefault(_slime);

function _interopRequireDefault(obj) {
                                              return obj && obj.__esModule ? obj : { default: obj };
}

window.enemies = { Slime: _slime2.default }; /*
                                              *
                                              *  XL RPG/Enemy/Directory
                                              *  XL Gaming/Declan Tyson
                                              *  v0.0.8
                                              *  23/12/2016
                                              *
                                              */


},{"./slime":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _enemy = require("./enemy");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /*
   *
   *  XL RPG/Enemy/Slime
   *  XL Gaming/Declan Tyson
   *  v0.0.8
   *  23/12/2016
   *
   */

var Slime = function (_Enemy) {
    _inherits(Slime, _Enemy);

    function Slime() {
        _classCallCheck(this, Slime);

        return _possibleConstructorReturn(this, (Slime.__proto__ || Object.getPrototypeOf(Slime)).call(this, "Slime", 10, 4, 3, 4, 1));
    }

    return Slime;
}(_enemy.Enemy);

exports.default = Slime;
;


},{"./enemy":2}],5:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _player = require("./player");

var _worldmap = require("./scenes/worldmap");

var _route = require("./locales/route1");

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
} /*
   *
   *  XL RPG/Game
   *  XL Gaming/Declan Tyson
   *  v0.0.8
   *  23/12/2016
   *
   */

window.onload = function () {
    var renderer = new Renderer("world", _constants.canvasProperties.width, _constants.canvasProperties.height),
        player = new _player.Player(),
        scene = new _worldmap.WorldMap(player),
        start = new _route.RouteOne(player);

    window.game = new Game(renderer, scene, _constants.canvasProperties.centerPoint);
    window.game.scene.setCurrentLocale(start);

    start.enterLocaleAt("beginningOfGame");
};

var Renderer = function Renderer(element, width, height) {
    _classCallCheck(this, Renderer);

    this.canvas = document.getElementById(element);
    this.canvas.style.width = width;
    this.canvas.style.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.fps = _constants.fps;
    this.ctx = this.canvas.getContext("2d");
};

var Game = function () {
    function Game(renderer, scene, centerPoint) {
        _classCallCheck(this, Game);

        this.actionTimeout = _constants.actionTimeoutLimit;
        this.renderer = renderer;
        this.setScene(scene);
        this.centerPoint = centerPoint;
        this.currentAction = null;

        window.drawScene = setInterval(this.draw.bind(this), 1000 / this.renderer.fps);
    }

    _createClass(Game, [{
        key: "draw",
        value: function draw() {
            var pre_canvas = document.createElement('canvas'),
                pre_ctx = pre_canvas.getContext('2d');
            pre_canvas.height = this.renderer.canvas.height;
            pre_canvas.width = this.renderer.canvas.width;

            this.renderer.ctx.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

            this.scene.doActions(this.currentAction);
            this.scene.draw(pre_ctx);

            this.renderer.ctx.drawImage(pre_canvas, 0, 0);
        }
    }, {
        key: "setScene",
        value: function setScene(scene) {
            this.scene = scene;
            this.scene.setGame(this);
        }
    }, {
        key: "sendInput",
        value: function sendInput(input) {
            this.currentAction = input;
        }
    }, {
        key: "triggerActionTimeout",
        value: function triggerActionTimeout() {
            this.actionTimeoutCounterInterval = setInterval(this.actionTimeoutCounter.bind(this), 1000 / this.renderer.fps);
        }
    }, {
        key: "actionTimeoutCounter",
        value: function actionTimeoutCounter() {
            this.actionTimeout--;
            if (this.actionTimeout === 0) {
                clearInterval(this.actionTimeoutCounterInterval);
                this.actionTimeout = _constants.actionTimeoutLimit;
            }
        }
    }]);

    return Game;
}();


},{"./constants":1,"./locales/route1":8,"./player":9,"./scenes/worldmap":13}],6:[function(require,module,exports){
"use strict";

/*
 *
 *  XL RPG/Inputs
 *  XL Gaming/Declan Tyson
 *  v0.0.5
 *  23/12/2016
 *
 */

var actions = {
    38: "up",
    40: "down",
    37: "left",
    39: "right",
    32: "action"
};

window.addEventListener("keydown", function (e) {
    if (!actions[e.keyCode] || !window.game) return;
    window.game.sendInput(actions[e.keyCode]);
});

window.addEventListener("keyup", function (e) {
    if (!window.game) return;
    window.game.sendInput(null);
});


},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
 *
 */

var Locale = function () {
    function Locale(player) {
        _classCallCheck(this, Locale);

        this.player = player;
        this.entryPoints = {};
    }

    _createClass(Locale, [{
        key: "initialise",
        value: function initialise(width, height) {
            var map = [],
                enc = [];
            for (var i = 0; i < width; i++) {
                map.push([]);
                enc.push([]);
                for (var j = 0; j < height; j++) {
                    map[i].push(["Blank"]);
                    enc[i].push(false);
                }
            }

            this.map = map;
            this.encounters = enc;
            this.width = width;
            this.height = height;
        }
    }, {
        key: "terrainPaint",
        value: function terrainPaint(startX, startY, width, height, terrain) {
            for (var x = startX; x < startX + width; x++) {
                for (var y = startY; y < startY + height; y++) {
                    this.map[x][y] = terrain;
                }
            }
        }
    }, {
        key: "randomEncounterPatch",
        value: function randomEncounterPatch(startX, startY, width, height, rate, enemies) {
            for (var x = startX; x < startX + width; x++) {
                for (var y = startY; y < startY + height; y++) {
                    this.encounters[x][y] = {
                        rate: rate,
                        enemies: enemies
                    };
                }
            }
        }
    }, {
        key: "enterLocaleAt",
        value: function enterLocaleAt(entryPoint) {
            this.player.setPlacement(this.entryPoints[entryPoint].x, this.entryPoints[entryPoint].y);
        }
    }]);

    return Locale;
}();

exports.Locale = Locale;


},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RouteOne = undefined;

var _locales = require("./locales");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /*
   *
   *  XL RPG/Locales/Route 1
   *  XL Gaming/Declan Tyson
   *  v0.0.8
   *  23/12/2016
   *
   */

var RouteOne = function (_Locale) {
    _inherits(RouteOne, _Locale);

    function RouteOne(player) {
        _classCallCheck(this, RouteOne);

        var _this = _possibleConstructorReturn(this, (RouteOne.__proto__ || Object.getPrototypeOf(RouteOne)).call(this, player));

        _this.entryPoints.beginningOfGame = { x: 30, y: 30 };

        _this.initialise(300, 300);

        _this.terrainPaint(0, 0, 300, 300, "Water");
        _this.terrainPaint(20, 27, 15, 90, "Grass");
        _this.terrainPaint(35, 35, 2, 40, "Grass");
        _this.terrainPaint(37, 37, 2, 36, "Grass");
        _this.terrainPaint(39, 39, 2, 32, "Grass");
        return _this;
    }

    return RouteOne;
}(_locales.Locale);

exports.RouteOne = RouteOne;


},{"./locales":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}(); /*
      *
      *  XL RPG/Player
      *  XL Gaming/Declan Tyson
      *  v0.0.3
      *  23/12/2016
      *
      */

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Player = function () {
    function Player() {
        _classCallCheck(this, Player);

        this.colour = _constants.colours.black;
    }

    _createClass(Player, [{
        key: "setPlacement",
        value: function setPlacement(x, y) {
            this.x = x;
            this.y = y;
        }
    }]);

    return Player;
}();

exports.Player = Player;


},{"./constants":1}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Scene = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}(); /*
      *
      *  XL RPG/Scene
      *  XL Gaming/Declan Tyson
      *  v0.0.4
      *  23/12/2016
      *
      */

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Scene = function () {
    function Scene() {
        _classCallCheck(this, Scene);

        this.actions = {};
    }

    _createClass(Scene, [{
        key: "doActions",
        value: function doActions(action) {
            if (this.game.actionTimeout < _constants.actionTimeoutLimit || !action) return;
            this.game.triggerActionTimeout();

            this.actions[action]();
        }
    }]);

    return Scene;
}();

exports.Scene = Scene;


},{"./constants":1}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Encounter = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _scene = require("./scene");

var _constants = require("../constants");

require("../enemies/enemydirectory");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /*
   *
   *  XL RPG/Scene-Encounter
   *  XL Gaming/Declan Tyson
   *  v0.0.8
   *  23/12/2016
   *
   */

var Encounter = function (_Scene) {
    _inherits(Encounter, _Scene);

    function Encounter(enemies) {
        _classCallCheck(this, Encounter);

        var _this = _possibleConstructorReturn(this, (Encounter.__proto__ || Object.getPrototypeOf(Encounter)).call(this));

        _this.enemies = [];
        var self = _this;
        enemies.forEach(function (enemy) {
            self.enemies.push(new window.enemies[enemy]());
        });
        return _this;
    }

    _createClass(Encounter, [{
        key: "draw",
        value: function draw(ctx) {
            ctx.strokeStyle = _constants.colours.black;
            ctx.rect(0, 0, _constants.canvasProperties.width, _constants.canvasProperties.height);
            ctx.fill();
        }
    }]);

    return Encounter;
}(_scene.Scene);

exports.Encounter = Encounter;


},{"../constants":1,"../enemies/enemydirectory":3,"./scene":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Scene = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}(); /*
      *
      *  XL RPG/Scene
      *  XL Gaming/Declan Tyson
      *  v0.0.8
      *  23/12/2016
      *
      */

var _constants = require("../constants");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Scene = function () {
    function Scene() {
        _classCallCheck(this, Scene);

        this.actions = {
            up: this.empty,
            down: this.empty,
            left: this.empty,
            right: this.empty,
            action: this.empty
        };
    }

    _createClass(Scene, [{
        key: "empty",
        value: function empty() {
            return null;
        }
    }, {
        key: "doActions",
        value: function doActions(action) {
            if (!this.game || this.game.actionTimeout < _constants.actionTimeoutLimit || !action) return;
            this.game.triggerActionTimeout();

            this.actions[action]();
        }
    }, {
        key: "draw",
        value: function draw(ctx) {}
    }, {
        key: "setGame",
        value: function setGame(game) {
            this.game = game;
        }
    }]);

    return Scene;
}();

exports.Scene = Scene;


},{"../constants":1}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WorldMap = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

var _constants = require("../constants");

var _terrain = require("../terrain");

var _scene = require("./scene");

var _encounter = require("./encounter");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /*
   *
   *  XL RPG/Scene-WorldMap
   *  XL Gaming/Declan Tyson
   *  v0.0.8
   *  23/12/2016
   *
   */

var WorldMap = function (_Scene) {
    _inherits(WorldMap, _Scene);

    function WorldMap(player) {
        _classCallCheck(this, WorldMap);

        var _this = _possibleConstructorReturn(this, (WorldMap.__proto__ || Object.getPrototypeOf(WorldMap)).call(this));

        _this.player = player;

        _this.actions.up = _this.moveUp.bind(_this);
        _this.actions.down = _this.moveDown.bind(_this);
        _this.actions.left = _this.moveLeft.bind(_this);
        _this.actions.right = _this.moveRight.bind(_this);
        return _this;
    }

    _createClass(WorldMap, [{
        key: "doActions",
        value: function doActions(action) {
            _get(WorldMap.prototype.__proto__ || Object.getPrototypeOf(WorldMap.prototype), "doActions", this).call(this, action);

            if (!action) return;
            this.checkForRandomEncounters();
        }
    }, {
        key: "moveUp",
        value: function moveUp() {
            if (this.localeMap[this.player.x][this.player.y - 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y - 1);
        }
    }, {
        key: "moveDown",
        value: function moveDown() {
            if (this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
        }
    }, {
        key: "moveLeft",
        value: function moveLeft() {
            if (this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
        }
    }, {
        key: "moveRight",
        value: function moveRight() {
            if (this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            this.drawLocale(ctx);
            this.drawPlayer(ctx);
        }
    }, {
        key: "drawPlayer",
        value: function drawPlayer(ctx) {
            // Player is always at center of screen

            ctx.beginPath();
            ctx.rect(this.game.centerPoint.x, this.game.centerPoint.y, _constants.tileSize, _constants.tileSize);
            ctx.fillStyle = _constants.colours.black;
            ctx.fill();
        }
    }, {
        key: "drawLocale",
        value: function drawLocale(ctx) {
            if (!this.locale) return;
            var offsetX = this.player.x * _constants.tileSize - this.game.centerPoint.x,
                offsetY = this.player.y * _constants.tileSize - this.game.centerPoint.y,
                viewportStartX = this.player.x - _constants.tilesWide / 2,
                viewportStartY = this.player.y - _constants.tilesHigh / 2;

            if (viewportStartX < 0) viewportStartX = 0;
            if (viewportStartY < 0) viewportStartY = 0;
            if (viewportStartX >= this.locale.width) viewportStartX = this.locale.width;
            if (viewportStartY >= this.locale.height) viewportStartY = this.locale.height;

            for (var x = viewportStartX; x <= viewportStartX + _constants.tilesWide; x++) {
                for (var y = viewportStartY; y <= viewportStartY + _constants.tilesHigh; y++) {
                    var terrain = this.localeMap[x][y];
                    ctx.beginPath();
                    ctx.fillStyle = terrain.colour;
                    ctx.strokeStyle = terrain.colour;
                    ctx.rect(x * _constants.tileSize - offsetX, y * _constants.tileSize - offsetY, _constants.tileSize, _constants.tileSize);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }, {
        key: "checkForRandomEncounters",
        value: function checkForRandomEncounters() {
            var potentialRandomEncounter = this.locale.encounters[this.player.x][this.player.y];
            if (!potentialRandomEncounter) return;

            var chance = Math.ceil(Math.random() * potentialRandomEncounter.rate);
            console.log(chance);
            if (chance === potentialRandomEncounter.rate) {
                this.startRandomEncounter(potentialRandomEncounter.enemies);
            }
        }
    }, {
        key: "startRandomEncounter",
        value: function startRandomEncounter(enemies) {
            this.game.setScene(new _encounter.Encounter(enemies));
        }
    }, {
        key: "setCurrentLocale",
        value: function setCurrentLocale(locale) {
            this.locale = locale;
            this.localeMap = locale.map;

            this.rasterizeLocaleMap();
        }
    }, {
        key: "rasterizeLocaleMap",
        value: function rasterizeLocaleMap() {
            if (!this.locale) return;

            for (var x = 0; x < this.locale.width; x++) {
                for (var y = 0; y < this.locale.height; y++) {
                    var terrainType = this.locale.map[x][y];
                    this.localeMap[x][y] = new window.terrains[terrainType]();
                }
            }
        }
    }]);

    return WorldMap;
}(_scene.Scene);

exports.WorldMap = WorldMap;


},{"../constants":1,"../terrain":14,"./encounter":11,"./scene":12}],14:[function(require,module,exports){
'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}(); /*
      *
      *  XL RPG/Terrain
      *  XL Gaming/Declan Tyson
      *  v0.0.1
      *  21/12/2016
      *
      */

var _constants = require('./constants');

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Terrain = function () {
    function Terrain() {
        _classCallCheck(this, Terrain);

        this.encounters = [];
    }

    _createClass(Terrain, [{
        key: 'isPassable',
        value: function isPassable() {
            return this.passable;
        }
    }, {
        key: 'hasEncounters',
        value: function hasEncounters() {
            return this.encounters;
        }
    }]);

    return Terrain;
}();

var Blank = function (_Terrain) {
    _inherits(Blank, _Terrain);

    function Blank() {
        _classCallCheck(this, Blank);

        var _this = _possibleConstructorReturn(this, (Blank.__proto__ || Object.getPrototypeOf(Blank)).call(this));

        _this.passable = false;
        _this.colour = _constants.colours.black;
        return _this;
    }

    return Blank;
}(Terrain);

var Grass = function (_Terrain2) {
    _inherits(Grass, _Terrain2);

    function Grass() {
        _classCallCheck(this, Grass);

        var _this2 = _possibleConstructorReturn(this, (Grass.__proto__ || Object.getPrototypeOf(Grass)).call(this));

        _this2.passable = true;
        _this2.colour = _constants.colours.green;
        return _this2;
    }

    return Grass;
}(Terrain);

var Water = function (_Terrain3) {
    _inherits(Water, _Terrain3);

    function Water() {
        _classCallCheck(this, Water);

        var _this3 = _possibleConstructorReturn(this, (Water.__proto__ || Object.getPrototypeOf(Water)).call(this));

        _this3.passable = false;
        _this3.colour = _constants.colours.blue;
        return _this3;
    }

    return Water;
}(Terrain);

window.terrains = { Blank: Blank, Grass: Grass, Water: Water };


},{"./constants":1}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WorldMap = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _constants = require("./constants");

var _scene = require("./scene");

var _terrain = require("./terrain");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /*
   *
   *  XL RPG/Scene-WorldMap
   *  XL Gaming/Declan Tyson
   *  v0.0.6
   *  23/12/2016
   *
   */

var WorldMap = function (_Scene) {
    _inherits(WorldMap, _Scene);

    function WorldMap(player) {
        _classCallCheck(this, WorldMap);

        var _this = _possibleConstructorReturn(this, (WorldMap.__proto__ || Object.getPrototypeOf(WorldMap)).call(this));

        _this.player = player;

        _this.actions.up = _this.moveUp.bind(_this);
        _this.actions.down = _this.moveDown.bind(_this);
        _this.actions.left = _this.moveLeft.bind(_this);
        _this.actions.right = _this.moveRight.bind(_this);
        _this.actions.action = null;
        return _this;
    }

    _createClass(WorldMap, [{
        key: "moveUp",
        value: function moveUp() {
            if (this.localeMap[this.player.x][this.player.y - 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y - 1);
        }
    }, {
        key: "moveDown",
        value: function moveDown() {
            if (this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
        }
    }, {
        key: "moveLeft",
        value: function moveLeft() {
            if (this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
        }
    }, {
        key: "moveRight",
        value: function moveRight() {
            if (this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            this.drawLocale(ctx);
            this.drawPlayer(ctx);
        }
    }, {
        key: "drawPlayer",
        value: function drawPlayer(ctx) {
            // Player is always at center of screen

            ctx.beginPath();
            ctx.rect(this.game.centerPoint.x, this.game.centerPoint.y, _constants.tileSize, _constants.tileSize);
            ctx.fillStyle = _constants.colours.black;
            ctx.fill();
        }
    }, {
        key: "drawLocale",
        value: function drawLocale(ctx) {
            if (!this.locale) return;
            var offsetX = this.player.x * _constants.tileSize - this.game.centerPoint.x,
                offsetY = this.player.y * _constants.tileSize - this.game.centerPoint.y,
                viewportStartX = this.player.x - _constants.tilesWide / 2,
                viewportStartY = this.player.y - _constants.tilesHigh / 2;

            if (viewportStartX < 0) viewportStartX = 0;
            if (viewportStartY < 0) viewportStartY = 0;
            if (viewportStartX >= this.locale.width) viewportStartX = this.locale.width;
            if (viewportStartY >= this.locale.height) viewportStartY = this.locale.height;

            for (var x = viewportStartX; x <= viewportStartX + _constants.tilesWide; x++) {
                for (var y = viewportStartY; y <= viewportStartY + _constants.tilesHigh; y++) {
                    var terrain = this.localeMap[x][y];
                    ctx.beginPath();
                    ctx.fillStyle = terrain.colour;
                    ctx.strokeStyle = terrain.colour;
                    ctx.rect(x * _constants.tileSize - offsetX, y * _constants.tileSize - offsetY, _constants.tileSize, _constants.tileSize);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }, {
        key: "setCurrentLocale",
        value: function setCurrentLocale(locale) {
            this.locale = locale;
            this.localeMap = locale.map;

            this.rasterizeLocaleMap();
        }
    }, {
        key: "rasterizeLocaleMap",
        value: function rasterizeLocaleMap() {
            for (var x = 0; x < this.locale.width; x++) {
                for (var y = 0; y < this.locale.height; y++) {
                    var terrainType = this.locale.map[x][y];
                    this.localeMap[x][y] = new window.terrains[terrainType]();
                }
            }
        }
    }, {
        key: "setGame",
        value: function setGame(game) {
            this.game = game;
        }
    }]);

    return WorldMap;
}(_scene.Scene);

exports.WorldMap = WorldMap;


},{"./constants":1,"./scene":10,"./terrain":14}]},{},[1,5,6,9,10,14,15]);
