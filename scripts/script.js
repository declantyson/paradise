(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Inhabitance = exports.Interior = exports.Locale = undefined;

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
      *  XL RPG/Locales/Base
      *  XL Gaming/Declan Tyson
      *  v0.0.19
      *  05/02/2018
      *
      */

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _constants = require('./constants');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
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
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Locale = function () {
    function Locale(player, people) {
        _classCallCheck(this, Locale);

        this.player = player;
        this.people = people;
        this.entryPoints = {};
        this.spawnPoints = [];
        this.inhabitances = [];
    }

    _createClass(Locale, [{
        key: 'initialise',
        value: function initialise(width, height) {
            var map = [],
                enc = [],
                ent = [];
            for (var i = 0; i < width; i++) {
                map.push([]);
                enc.push([]);
                ent.push([]);
                for (var j = 0; j < height; j++) {
                    map[i].push(["Blank"]);
                    enc[i].push(false);
                    ent[i].push(false);
                }
            }

            this.map = map;
            this.encounters = enc;
            this.entrances = ent;
            this.width = width;
            this.height = height;
        }
    }, {
        key: 'terrainPaint',
        value: function terrainPaint(startX, startY, width, height, terrain) {
            for (var x = startX; x < startX + width; x++) {
                for (var y = startY; y < startY + height; y++) {
                    this.map[x][y] = terrain;
                }
            }
        }
    }, {
        key: 'randomEncounterPatch',
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
        key: 'addInhabitance',
        value: function addInhabitance(startX, startY, width, height, inhabitance) {
            var doorway = inhabitance.doorway;
            this.terrainPaint(startX, startY, width, height, "Wall");
            this.terrainPaint(doorway.x, doorway.y, 1, 1, "Doorway");
            this.entrances[doorway.x][doorway.y] = {
                locale: inhabitance,
                entryPoint: "frontDoor"
            };
        }
    }, {
        key: 'enterLocaleAt',
        value: function enterLocaleAt(entryPoint) {
            this.player.setPlacement(this.entryPoints[entryPoint].x, this.entryPoints[entryPoint].y);
        }
    }, {
        key: 'drawInhabitances',
        value: function drawInhabitances() {
            for (var i = 0; i < this.inhabitances.length; i++) {
                var inhabitance = this.inhabitances[i];
                this.addInhabitance(inhabitance.x, inhabitance.y, _constants.inhabitanceSize, _constants.inhabitanceSize, inhabitance);
            }
        }
    }, {
        key: 'assignPeopleToInhabitances',
        value: function assignPeopleToInhabitances() {
            if (this.inhabitances.length === 0 || this.people.length === 0) return;

            for (var i = 0; i < this.people.length; i++) {
                var person = this.people[i],
                    index = Math.floor(Math.random() * this.inhabitances.length),
                    inhabitance = this.inhabitances[index];

                inhabitance.addInhabitant(person);
            }
        }
    }]);

    return Locale;
}();

var Interior = function (_Locale) {
    _inherits(Interior, _Locale);

    function Interior(player, people, inhabitance) {
        _classCallCheck(this, Interior);

        var _this = _possibleConstructorReturn(this, (Interior.__proto__ || Object.getPrototypeOf(Interior)).call(this, player, people));

        _this.inhabitance = inhabitance;
        util.log('Welcome to ' + inhabitance.name + '.');

        for (var i = 0; i < inhabitance.inhabitants.length; i++) {
            var inhabitant = inhabitance.inhabitants[i];
            util.log(inhabitant + ' lives here.');
        }
        return _this;
    }

    return Interior;
}(Locale);

var Inhabitance = function () {
    function Inhabitance(id, name, x, y, doorway) {
        _classCallCheck(this, Inhabitance);

        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.doorway = doorway;
        this.inhabitants = [];
    }

    _createClass(Inhabitance, [{
        key: 'addInhabitant',
        value: function addInhabitant(person) {
            this.inhabitants.push(person);
        }
    }]);

    return Inhabitance;
}();

exports.Locale = Locale;
exports.Interior = Interior;
exports.Inhabitance = Inhabitance;


},{"./constants":3,"./util":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Person = undefined;

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
      *  XL RPG/Person
      *  XL Gaming/Declan Tyson
      *  v0.0.19
      *  05/02/2018
      *
      */

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _constants = require('./constants');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function () {
    function Person(name, gender) {
        _classCallCheck(this, Person);

        this.name = name;
        this.gender = gender;
        this.colour = _constants.colours.black;

        this.relationships = {};
    }

    _createClass(Person, [{
        key: 'randomizeRelationships',
        value: function randomizeRelationships() {
            var _this = this;

            Object.keys(this.relationships).forEach(function (name) {
                var relationship = _this.relationships[name],
                    oldValue = relationship.value,
                    newValue = Math.floor(Math.random() * 99);

                util.log(_this.name + '\'s relationship with ' + _constants.pronouns[_this.gender] + ' ' + relationship.description + ', ' + name + ', goes from ' + oldValue + ' to ' + newValue + '.');
                _this.relationships[name].value = newValue;
            });
        }
    }, {
        key: 'addAcquaintanceRelationship',
        value: function addAcquaintanceRelationship(person) {
            this.relationships[person] = {
                description: "Acquaintance",
                value: 50
            };
        }
    }]);

    return Person;
}();

exports.Person = Person;


},{"./constants":3,"./util":11}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

var colours = exports.colours = {
    black: "#000000",
    white: "#FFFFFF",
    green: "#00AA00",
    blue: "#0000AA",
    brown: "#4f1f0b",
    darkbrown: "#291006",
    grey: "#cdcdcd"
};

var tileSize = exports.tileSize = 10;

var tilesWide = exports.tilesWide = 64,
    tilesHigh = exports.tilesHigh = 36;

var canvasProperties = exports.canvasProperties = {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    centerPoint: {
        x: tileSize * tilesWide / 2 - tileSize / 2,
        y: tileSize * tilesHigh / 2 - tileSize / 2
    }
};

var fps = exports.fps = 45;
var actionTimeoutLimit = exports.actionTimeoutLimit = 2;

var personCount = exports.personCount = 4;
var genders = exports.genders = {
    male: "M",
    female: "F",
    alien: "A"
};
var pronouns = exports.pronouns = {
    M: "his",
    F: "her",
    A: "xleir"
};
var inhabitanceSize = exports.inhabitanceSize = 2;


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StartGame = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _inputs = require('./inputs');

var input = _interopRequireWildcard(_inputs);

var _player = require('./player');

var _worldmap = require('./worldmap');

var _constants = require('./constants');

var _locales = require('./locales');

var _availablelocales = require('../locales/availablelocales');

var _people = require('./people');

var _availablepeople = require('../people/availablepeople');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
} /*
   *
   *  XL RPG/Game
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  06/02/2018
   *
   */

var StartGame = exports.StartGame = function StartGame(locale, people, victim, murderer) {
    clearInterval(window.drawScene);

    locale = _availablelocales.startingMaps[locale] || _availablelocales.startingMaps[(0, _locales.chooseStartingMap)()];
    people = people || (0, _people.choosePeople)();
    victim = victim || (0, _availablepeople.chooseVictim)(people);
    murderer = murderer || (0, _availablepeople.chooseMurderer)(victim, people);

    var player = new _player.Player(),
        scene = new _worldmap.WorldMap(player),
        start = new locale(player, people),
        renderer = new Renderer('world', _constants.canvasProperties.width, _constants.canvasProperties.height);

    window.game = new Game(renderer, scene, _constants.canvasProperties.centerPoint);
    window.game.scene.setCurrentLocale(start, 'beginningOfGame');
};

var Renderer = function Renderer(element, width, height) {
    _classCallCheck(this, Renderer);

    this.canvas = document.getElementById(element);
    this.canvas.style.width = width;
    this.canvas.style.height = height;
    this.canvas.style.display = 'block';
    this.canvas.width = width;
    this.canvas.height = height;
    this.fps = _constants.fps;
    this.ctx = this.canvas.getContext('2d');
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
        key: 'draw',
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
        key: 'setScene',
        value: function setScene(scene) {
            this.scene = scene;
            this.scene.setGame(this);
        }
    }, {
        key: 'sendInput',
        value: function sendInput(input) {
            this.currentAction = input;
        }
    }, {
        key: 'triggerActionTimeout',
        value: function triggerActionTimeout() {
            this.actionTimeoutCounterInterval = setInterval(this.actionTimeoutCounter.bind(this), 1000 / this.renderer.fps);
        }
    }, {
        key: 'actionTimeoutCounter',
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


},{"../locales/availablelocales":13,"../people/availablepeople":22,"./constants":3,"./inputs":5,"./locales":6,"./people":7,"./player":8,"./worldmap":12}],5:[function(require,module,exports){
"use strict";

/*
 *
 *  XL RPG/Inputs
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  06/02/2018
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


},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  06/02/2018
 *
 */

var chooseStartingMap = exports.chooseStartingMap = function chooseStartingMap() {
  var locale = util.pickRandomProperty(startingMaps);
  util.log('Choosing starting map...');
  util.log('Map is ' + locale + '.');
  return locale;
};


},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.choosePeople = undefined;

var _constants = require("./constants");

var _util = require("./util");

var util = _interopRequireWildcard(_util);

var _availablepeople = require("../people/availablepeople");

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

var choosePeople = exports.choosePeople = function choosePeople() {
    var chosenPeople = [];
    util.log("Choosing " + _constants.personCount + " people...");
    var person = void 0;
    while (chosenPeople.length < _constants.personCount) {
        person = util.pickRandomProperty(_availablepeople.people);
        if (chosenPeople.indexOf(person) === -1) {
            chosenPeople.push(person);
            util.log(person + " has been chosen.");
        }
    }

    return chosenPeople;
}; /*
    *
    *  XL RPG/People
    *  XL Gaming/Declan Tyson
    *  v0.0.19
    *  06/02/2018
    *
    */


},{"../people/availablepeople":22,"./constants":3,"./util":11}],8:[function(require,module,exports){
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
      *  v0.0.19
      *  06/02/2018
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


},{"./constants":3}],9:[function(require,module,exports){
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
      *  v0.0.19
      *  06/02/2018
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


},{"./constants":3}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WoodenFloor = exports.Doorway = exports.Wall = exports.Road = exports.Water = exports.Grass = exports.Blank = undefined;

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
      *  v0.0.19
      *  06/02/2018
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

var Road = function (_Terrain4) {
    _inherits(Road, _Terrain4);

    function Road() {
        _classCallCheck(this, Road);

        var _this4 = _possibleConstructorReturn(this, (Road.__proto__ || Object.getPrototypeOf(Road)).call(this));

        _this4.passable = true;
        _this4.colour = _constants.colours.grey;
        return _this4;
    }

    return Road;
}(Terrain);

var Wall = function (_Terrain5) {
    _inherits(Wall, _Terrain5);

    function Wall() {
        _classCallCheck(this, Wall);

        var _this5 = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this));

        _this5.passable = false;
        _this5.colour = _constants.colours.brown;
        return _this5;
    }

    return Wall;
}(Terrain);

var Doorway = function (_Terrain6) {
    _inherits(Doorway, _Terrain6);

    function Doorway() {
        _classCallCheck(this, Doorway);

        var _this6 = _possibleConstructorReturn(this, (Doorway.__proto__ || Object.getPrototypeOf(Doorway)).call(this));

        _this6.passable = true;
        _this6.colour = _constants.colours.darkbrown;
        return _this6;
    }

    return Doorway;
}(Terrain);

var WoodenFloor = function (_Terrain7) {
    _inherits(WoodenFloor, _Terrain7);

    function WoodenFloor() {
        _classCallCheck(this, WoodenFloor);

        var _this7 = _possibleConstructorReturn(this, (WoodenFloor.__proto__ || Object.getPrototypeOf(WoodenFloor)).call(this));

        _this7.passable = true;
        _this7.colour = _constants.colours.darkbrown;
        return _this7;
    }

    return WoodenFloor;
}(Terrain);

exports.Blank = Blank;
exports.Grass = Grass;
exports.Water = Water;
exports.Road = Road;
exports.Wall = Wall;
exports.Doorway = Doorway;
exports.WoodenFloor = WoodenFloor;


},{"./constants":3}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 *
 *  XL RPG/Util
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

var pickRandomProperty = exports.pickRandomProperty = function pickRandomProperty(obj) {
    var result = void 0,
        count = 0;

    for (var prop in obj) {
        if (Math.random() < 1 / ++count) result = prop;
    }
    return result;
};

var pickRandomIndex = exports.pickRandomIndex = function pickRandomIndex(arr) {
    var indexOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = Math.floor(Math.random() * (arr.length - 1));
    if (indexOnly) return index;
    return arr[index];
};

var log = exports.log = function log(str) {
    document.getElementById('log').innerHTML += '\n\t' + str;
};


},{}],12:[function(require,module,exports){
'use strict';

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

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _terrain2 = require('./terrain');

var terrain = _interopRequireWildcard(_terrain2);

var _constants = require('./constants');

var _scene = require('./scene');

var _availablelocales = require('../locales/availablelocales');

var _availablepeople = require('../people/availablepeople');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

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
   *  v0.0.19
   *  06/02/2018
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

        _this.visitedLocales = {};
        _this.presentPeople = [];
        return _this;
    }

    _createClass(WorldMap, [{
        key: 'doActions',
        value: function doActions(action) {
            _get(WorldMap.prototype.__proto__ || Object.getPrototypeOf(WorldMap.prototype), 'doActions', this).call(this, action);

            if (!action) return;
            this.checkForRandomEncounters();
            this.checkForEntrance();
        }
    }, {
        key: 'moveUp',
        value: function moveUp() {
            if (this.localeMap[this.player.x][this.player.y - 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y - 1);
        }
    }, {
        key: 'moveDown',
        value: function moveDown() {
            if (this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            if (this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            if (this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {
            this.offsetX = this.player.x * _constants.tileSize - this.game.centerPoint.x;
            this.offsetY = this.player.y * _constants.tileSize - this.game.centerPoint.y;
            this.viewportStartX = this.player.x - _constants.tilesWide / 2;
            this.viewportStartY = this.player.y - _constants.tilesHigh / 2;

            this.drawLocale(ctx);
            this.drawPlayer(ctx);
            this.drawPeople(ctx);
        }
    }, {
        key: 'drawPlayer',
        value: function drawPlayer(ctx) {
            // Player is always at center of screen

            ctx.beginPath();
            ctx.rect(this.game.centerPoint.x, this.game.centerPoint.y, _constants.tileSize, _constants.tileSize);
            ctx.fillStyle = this.player.colour;
            ctx.fill();
        }
    }, {
        key: 'drawLocale',
        value: function drawLocale(ctx) {
            if (!this.locale) return;

            var viewportStartX = this.viewportStartX,
                viewportStartY = this.viewportStartY;

            if (viewportStartX < 0) viewportStartX = 0;
            if (viewportStartY < 0) viewportStartY = 0;
            if (viewportStartX >= this.locale.width) viewportStartX = this.locale.width;
            if (viewportStartY >= this.locale.height) viewportStartY = this.locale.height;

            for (var x = viewportStartX; x <= viewportStartX + _constants.tilesWide; x++) {
                for (var y = viewportStartY; y <= viewportStartY + _constants.tilesHigh; y++) {
                    var _terrain = this.localeMap[x][y];
                    ctx.beginPath();
                    ctx.fillStyle = _terrain.colour;
                    ctx.strokeStyle = _terrain.colour;
                    ctx.rect(x * _constants.tileSize - this.offsetX, y * _constants.tileSize - this.offsetY, _constants.tileSize, _constants.tileSize);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }, {
        key: 'drawPeople',
        value: function drawPeople(ctx) {
            var _this2 = this;

            if (this.presentPeople.length === 0) return;

            this.presentPeople.forEach(function (person) {
                ctx.beginPath();
                ctx.rect(person.x * _constants.tileSize - _this2.offsetX, person.y * _constants.tileSize - _this2.offsetY, _constants.tileSize, _constants.tileSize);
                ctx.strokeStyle = person.colour;
                ctx.fillStyle = person.colour;
                ctx.fill();
                ctx.stroke();

                _this2.localeMap[person.x][person.y].passable = false;
            });
        }
    }, {
        key: 'checkForRandomEncounters',
        value: function checkForRandomEncounters() {
            var potentialRandomEncounter = this.locale.encounters[this.player.x][this.player.y];
            if (!potentialRandomEncounter) return;

            var chance = Math.ceil(Math.random() * potentialRandomEncounter.rate);
            if (chance === potentialRandomEncounter.rate) {
                this.startRandomEncounter(potentialRandomEncounter.enemies);
            }
        }
    }, {
        key: 'startRandomEncounter',
        value: function startRandomEncounter(enemies) {
            this.game.setScene(new Encounter(enemies));
        }
    }, {
        key: 'checkForEntrance',
        value: function checkForEntrance() {
            var entrance = this.locale.entrances[this.player.x][this.player.y];
            if (!entrance) return;

            this.enter(entrance);
        }
    }, {
        key: 'enter',
        value: function enter(entrance) {
            this.presentPeople = [];

            if (typeof this.visitedLocales[entrance.locale.id] !== 'undefined') {
                this.setCurrentLocale(this.visitedLocales[entrance.locale.id], entrance.entryPoint, false);
                return;
            }

            var localeId = _availablelocales.locales[entrance.locale.id],
                locale = new localeId(this.locale.player, this.locale.people, entrance.locale);

            this.setCurrentLocale(locale, entrance.entryPoint);
            this.spawnPeople();
        }
    }, {
        key: 'spawnPeople',
        value: function spawnPeople() {
            var _this3 = this;

            if (this.locale.inhabitance === undefined) return;

            this.locale.inhabitance.inhabitants.forEach(function (inhabitant, index) {
                var spawnPoint = _this3.locale.spawnPoints[index];
                if (spawnPoint !== undefined) {
                    var person = new _availablepeople.people[inhabitant]();
                    person.x = spawnPoint.x;
                    person.y = spawnPoint.y;
                    _this3.presentPeople.push(person);
                }
            });
        }
    }, {
        key: 'setCurrentLocale',
        value: function setCurrentLocale(locale, entryPoint) {
            var rasterize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            this.visitedLocales[locale.id] = locale;

            this.locale = locale;
            this.localeMap = locale.map;
            locale.enterLocaleAt(entryPoint);

            if (rasterize) this.rasterizeLocaleMap();
        }
    }, {
        key: 'rasterizeLocaleMap',
        value: function rasterizeLocaleMap() {
            if (!this.locale) return;

            for (var x = 0; x < this.locale.width; x++) {
                for (var y = 0; y < this.locale.height; y++) {
                    var terrainType = this.locale.map[x][y];

                    this.localeMap[x][y] = new terrain[terrainType]();
                }
            }
        }
    }]);

    return WorldMap;
}(_scene.Scene);

exports.WorldMap = WorldMap;


},{"../locales/availablelocales":13,"../people/availablepeople":22,"./constants":3,"./scene":9,"./terrain":10,"./util":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.locales = exports.startingMaps = undefined;

var _village = require('./village');

var _islands = require('./islands');

var _grovestreet = require('./interiors/1grovestreet');

var _grovestreet2 = require('./interiors/2grovestreet');

var _grovestreet3 = require('./interiors/3grovestreet');

var _grovestreet4 = require('./interiors/4grovestreet');

/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  06/02/2018
 *
 */

// Locales

var startingMaps = exports.startingMaps = {
    "Village": _village.Village,
    "Islands": _islands.Islands
};

var locales = exports.locales = {
    "Village": _village.Village,
    "Islands": _islands.Islands,
    "GroveStreet1": _grovestreet.GroveStreet1,
    "GroveStreet2": _grovestreet2.GroveStreet2,
    "GroveStreet3": _grovestreet3.GroveStreet3,
    "GroveStreet4": _grovestreet4.GroveStreet4
};


},{"./interiors/1grovestreet":14,"./interiors/2grovestreet":15,"./interiors/3grovestreet":16,"./interiors/4grovestreet":17,"./islands":19,"./village":20}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet1 = undefined;

var _islands = require("../islands");

var _grovestreethouse = require("./grovestreethouse");

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
   *  XL RPG/Locales/1 Grove Street
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var GroveStreet1 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet1, _GroveStreetTemplate);

    function GroveStreet1(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet1);

        var _this = _possibleConstructorReturn(this, (GroveStreet1.__proto__ || Object.getPrototypeOf(GroveStreet1)).call(this, player, people, inhabitance));

        _this.id = "1GroveStreet";
        _this.entryPoints.frontDoor = { x: 48, y: 48 };

        _this.entrances[49][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: "groveStreet1"
        };

        _this.terrainPaint(49, 48, 1, 1, "WoodenFloor");
        return _this;
    }

    return GroveStreet1;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet1 = GroveStreet1;


},{"../islands":19,"./grovestreethouse":18}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet2 = undefined;

var _islands = require("../islands");

var _grovestreethouse = require("./grovestreethouse");

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
   *  XL RPG/Locales/1 Grove Street
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var GroveStreet2 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet2, _GroveStreetTemplate);

    function GroveStreet2(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet2);

        var _this = _possibleConstructorReturn(this, (GroveStreet2.__proto__ || Object.getPrototypeOf(GroveStreet2)).call(this, player, people, inhabitance));

        _this.id = "2GroveStreet";
        _this.entryPoints.frontDoor = { x: 26, y: 48 };

        _this.entrances[25][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: "groveStreet2"
        };

        _this.terrainPaint(25, 48, 1, 1, "WoodenFloor");
        return _this;
    }

    return GroveStreet2;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet2 = GroveStreet2;


},{"../islands":19,"./grovestreethouse":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet3 = undefined;

var _islands = require("../islands");

var _grovestreethouse = require("./grovestreethouse");

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
   *  XL RPG/Locales/1 Grove Street
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var GroveStreet3 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet3, _GroveStreetTemplate);

    function GroveStreet3(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet3);

        var _this = _possibleConstructorReturn(this, (GroveStreet3.__proto__ || Object.getPrototypeOf(GroveStreet3)).call(this, player, people, inhabitance));

        _this.id = "3GroveStreet";
        _this.entryPoints.frontDoor = { x: 48, y: 48 };

        _this.entrances[49][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: "groveStreet3"
        };

        _this.terrainPaint(49, 48, 1, 1, "WoodenFloor");
        return _this;
    }

    return GroveStreet3;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet3 = GroveStreet3;


},{"../islands":19,"./grovestreethouse":18}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet4 = undefined;

var _islands = require("../islands");

var _grovestreethouse = require("./grovestreethouse");

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
   *  XL RPG/Locales/4 Grove Street
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var GroveStreet4 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet4, _GroveStreetTemplate);

    function GroveStreet4(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet4);

        var _this = _possibleConstructorReturn(this, (GroveStreet4.__proto__ || Object.getPrototypeOf(GroveStreet4)).call(this, player, people, inhabitance));

        _this.id = "2GroveStreet";
        _this.entryPoints.frontDoor = { x: 26, y: 48 };

        _this.entrances[25][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: "groveStreet4"
        };

        _this.terrainPaint(25, 48, 1, 1, "WoodenFloor");
        return _this;
    }

    return GroveStreet4;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet4 = GroveStreet4;


},{"../islands":19,"./grovestreethouse":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreetTemplate = undefined;

var _baselocale = require("../../engine/baselocale");

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
   *  XL RPG/Locales/Grove Street House Template
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var GroveStreetTemplate = function (_Interior) {
    _inherits(GroveStreetTemplate, _Interior);

    function GroveStreetTemplate(player, people, inhabitance) {
        _classCallCheck(this, GroveStreetTemplate);

        var _this = _possibleConstructorReturn(this, (GroveStreetTemplate.__proto__ || Object.getPrototypeOf(GroveStreetTemplate)).call(this, player, people, inhabitance));

        _this.initialise(100, 100);

        _this.spawnPoints.push({ x: 33, y: 35 });
        _this.spawnPoints.push({ x: 39, y: 36 });
        _this.spawnPoints.push({ x: 45, y: 32 });
        _this.spawnPoints.push({ x: 28, y: 33 });

        _this.terrainPaint(0, 0, 100, 100, "Blank");
        _this.terrainPaint(25, 25, 25, 25, "Wall");
        _this.terrainPaint(26, 26, 11, 23, "WoodenFloor");
        _this.terrainPaint(38, 26, 11, 23, "WoodenFloor");
        _this.terrainPaint(37, 37, 1, 1, "WoodenFloor");
        return _this;
    }

    return GroveStreetTemplate;
}(_baselocale.Interior);

exports.GroveStreetTemplate = GroveStreetTemplate;


},{"../../engine/baselocale":1}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Islands = undefined;

var _baselocale = require("../engine/baselocale");

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
   *  XL RPG/Locales/Islands
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  15/11/2017
   *
   */

var Islands = function (_Locale) {
    _inherits(Islands, _Locale);

    function Islands(player, people) {
        _classCallCheck(this, Islands);

        var _this = _possibleConstructorReturn(this, (Islands.__proto__ || Object.getPrototypeOf(Islands)).call(this, player, people));

        _this.id = "Islands";
        _this.entryPoints.beginningOfGame = { x: 56, y: 17 };
        _this.entryPoints.groveStreet1 = { x: 55, y: 20 };
        _this.entryPoints.groveStreet2 = { x: 58, y: 20 };
        _this.entryPoints.groveStreet3 = { x: 55, y: 23 };
        _this.entryPoints.groveStreet4 = { x: 58, y: 23 };

        _this.initialise(300, 300);

        _this.terrainPaint(0, 0, 300, 300, "Water");
        _this.terrainPaint(52, 17, 10, 20, "Grass");
        _this.terrainPaint(42, 35, 2, 8, "Grass");
        _this.terrainPaint(56, 17, 2, 20, "Road");
        _this.terrainPaint(55, 20, 1, 1, "Road");
        _this.terrainPaint(58, 20, 1, 1, "Road");
        _this.terrainPaint(55, 23, 1, 1, "Road");
        _this.terrainPaint(58, 23, 1, 1, "Road");

        _this.inhabitances.push(new _baselocale.Inhabitance("GroveStreet1", "1 Grove Street", 53, 19, { x: 54, y: 20 }), new _baselocale.Inhabitance("GroveStreet2", "2 Grove Street", 59, 19, { x: 59, y: 20 }), new _baselocale.Inhabitance("GroveStreet3", "3 Grove Street", 53, 22, { x: 54, y: 23 }), new _baselocale.Inhabitance("GroveStreet4", "4 Grove Street", 59, 22, { x: 59, y: 23 }));

        _this.drawInhabitances();
        _this.assignPeopleToInhabitances();
        return _this;
    }

    return Islands;
}(_baselocale.Locale);

exports.Islands = Islands;


},{"../engine/baselocale":1}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Village = undefined;

var _baselocale = require("../engine/baselocale");

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
   *  XL RPG/Locales/Village
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var Village = function (_Locale) {
    _inherits(Village, _Locale);

    function Village(player, people) {
        _classCallCheck(this, Village);

        var _this = _possibleConstructorReturn(this, (Village.__proto__ || Object.getPrototypeOf(Village)).call(this, player, people));

        _this.entryPoints.beginningOfGame = { x: 30, y: 30 };

        _this.initialise(300, 300);

        _this.terrainPaint(0, 0, 300, 300, "Water");
        _this.terrainPaint(20, 27, 15, 90, "Grass");
        _this.terrainPaint(35, 35, 2, 40, "Grass");
        _this.terrainPaint(37, 37, 2, 36, "Grass");
        _this.terrainPaint(39, 39, 2, 32, "Grass");
        return _this;
    }

    return Village;
}(_baselocale.Locale);

exports.Village = Village;


},{"../engine/baselocale":1}],21:[function(require,module,exports){
'use strict';

var _game = require('./engine/game');

window.startGame = _game.StartGame; /*
                                     *
                                     *  Paradise
                                     *  XL Gaming/Declan Tyson
                                     *  v0.0.19
                                     *  06/02/2018
                                     *
                                     */


},{"./engine/game":4}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chooseMurderer = exports.chooseVictim = exports.people = undefined;

var _util = require('../engine/util');

var util = _interopRequireWildcard(_util);

var _constants = require('../engine/constants');

var _evelyn = require('./evelyn');

var _jill = require('./jill');

var _john = require('./john');

var _neil = require('./neil');

var _pauline = require('./pauline');

var _petey = require('./petey');

var _quazar = require('./quazar');

var _zenith = require('./zenith');

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

/*
 *
 *  XL RPG/People
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

// People

var people = exports.people = {
    "Evelyn": _evelyn.Evelyn,
    "Jill": _jill.Jill,
    "John": _john.John,
    "Neil": _neil.Neil,
    "Pauline": _pauline.Pauline,
    "Petey": _petey.Petey,
    "Quazar": _quazar.Quazar,
    "Zenith": _zenith.Zenith
};

var chooseVictim = exports.chooseVictim = function chooseVictim(chosenPeople) {
    var victim = util.pickRandomIndex(chosenPeople);
    util.log(victim + ' is the unlucky one.');
    return victim;
};

var chooseMurderer = exports.chooseMurderer = function chooseMurderer(victimName, chosenPeople) {
    var trueRandom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var victim = new people[victimName]();
    chosenPeople.forEach(function (person) {
        if (victim.name === person.name) return;
        if (!(person in victim.relationships)) victim.addAcquaintanceRelationship(person);
    });

    if (trueRandom) v.randomizeRelationships();

    /*
     * Each relationship has a score of 0-99 (x)
     * We loop through each relationship, taking (x) away from 100
     * We then assign a random number between 1 and 100
     * If the random number is in the range of 100-(x), that's our murderer
     */

    /* jshint ignore:start */
    var murderer = null,
        relationship = null;
    while (murderer === null) {
        Object.keys(victim.relationships).forEach(function (name) {
            if (murderer !== null) return;
            if (name === victim.name) return;

            relationship = victim.relationships[name];
            var limit = 100 - relationship.value,
                test = Math.floor(Math.random() * 100);

            if (test < limit) murderer = name;
        });
    }
    /* jshint ignore:end */

    util.log(victim.name + '\'s murderer is ' + _constants.pronouns[victim.gender] + ' ' + relationship.description + ', ' + murderer + '!!!');
};


},{"../engine/constants":3,"../engine/util":11,"./evelyn":23,"./jill":24,"./john":25,"./neil":26,"./pauline":27,"./petey":28,"./quazar":29,"./zenith":30}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Evelyn = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Evelyn
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var Evelyn = function (_Person) {
    _inherits(Evelyn, _Person);

    function Evelyn() {
        _classCallCheck(this, Evelyn);

        return _possibleConstructorReturn(this, (Evelyn.__proto__ || Object.getPrototypeOf(Evelyn)).call(this, "Evelyn", _constants.genders.female));
    }

    return Evelyn;
}(_baseperson.Person);

exports.Evelyn = Evelyn;


},{"../engine/baseperson":2,"../engine/constants":3}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Jill = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Jill
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var Jill = function (_Person) {
    _inherits(Jill, _Person);

    function Jill() {
        _classCallCheck(this, Jill);

        return _possibleConstructorReturn(this, (Jill.__proto__ || Object.getPrototypeOf(Jill)).call(this, "Jill", _constants.genders.female));
    }

    return Jill;
}(_baseperson.Person);

exports.Jill = Jill;


},{"../engine/baseperson":2,"../engine/constants":3}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.John = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/John
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var John = function (_Person) {
    _inherits(John, _Person);

    function John() {
        _classCallCheck(this, John);

        return _possibleConstructorReturn(this, (John.__proto__ || Object.getPrototypeOf(John)).call(this, "John", _constants.genders.male));
    }

    return John;
}(_baseperson.Person);

exports.John = John;


},{"../engine/baseperson":2,"../engine/constants":3}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Neil = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Neil
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var Neil = function (_Person) {
    _inherits(Neil, _Person);

    function Neil() {
        _classCallCheck(this, Neil);

        return _possibleConstructorReturn(this, (Neil.__proto__ || Object.getPrototypeOf(Neil)).call(this, "Neil", _constants.genders.male));
    }

    return Neil;
}(_baseperson.Person);

exports.Neil = Neil;


},{"../engine/baseperson":2,"../engine/constants":3}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pauline = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Pauline
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var Pauline = function (_Person) {
    _inherits(Pauline, _Person);

    function Pauline() {
        _classCallCheck(this, Pauline);

        return _possibleConstructorReturn(this, (Pauline.__proto__ || Object.getPrototypeOf(Pauline)).call(this, "Pauline", _constants.genders.female));
    }

    return Pauline;
}(_baseperson.Person);

exports.Pauline = Pauline;


},{"../engine/baseperson":2,"../engine/constants":3}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Petey = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Petey
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  13/11/2017
   *
   */

var Petey = function (_Person) {
    _inherits(Petey, _Person);

    function Petey() {
        _classCallCheck(this, Petey);

        return _possibleConstructorReturn(this, (Petey.__proto__ || Object.getPrototypeOf(Petey)).call(this, "Petey", _constants.genders.male));
    }

    return Petey;
}(_baseperson.Person);

exports.Petey = Petey;


},{"../engine/baseperson":2,"../engine/constants":3}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Quazar = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Zenith
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var Quazar = function (_Person) {
    _inherits(Quazar, _Person);

    function Quazar() {
        _classCallCheck(this, Quazar);

        var _this = _possibleConstructorReturn(this, (Quazar.__proto__ || Object.getPrototypeOf(Quazar)).call(this, "Quazar", _constants.genders.alien));

        _this.colour = _constants.colours.green;
        _this.relationships = {
            "Zenith": {
                description: "Brother",
                value: 85
            }
        };
        return _this;
    }

    return Quazar;
}(_baseperson.Person);

exports.Quazar = Quazar;


},{"../engine/baseperson":2,"../engine/constants":3}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Zenith = undefined;

var _baseperson = require('../engine/baseperson');

var _constants = require('../engine/constants');

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
   *  XL RPG/Person/Quazar
   *  XL Gaming/Declan Tyson
   *  v0.0.19
   *  05/02/2018
   *
   */

var Zenith = function (_Person) {
    _inherits(Zenith, _Person);

    function Zenith() {
        _classCallCheck(this, Zenith);

        var _this = _possibleConstructorReturn(this, (Zenith.__proto__ || Object.getPrototypeOf(Zenith)).call(this, "Zenith", _constants.genders.alien));

        _this.colours = _constants.colours.green;
        _this.relationships = {
            "Quazar": {
                description: "Brother",
                value: 85
            }
        };
        return _this;
    }

    return Zenith;
}(_baseperson.Person);

exports.Zenith = Zenith;


},{"../engine/baseperson":2,"../engine/constants":3}]},{},[21]);
