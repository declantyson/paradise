(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

var fps = exports.fps = 45;
var actionTimeoutLimit = exports.actionTimeoutLimit = 2;
var tileSize = exports.tileSize = 15;
var tilesWide = exports.tilesWide = 96;
var tilesHigh = exports.tilesHigh = 54;

var colours = exports.colours = {
    black: '#000000',
    white: '#FFFFFF',
    green: '#00AA00',
    blue: '#0000AA',
    brown: '#4f1f0b',
    darkbrown: '#291006',
    grey: '#cdcdcd',
    red: '#ff0000'
};

var directions = exports.directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

var texts = exports.texts = {
    dead: 'Dead'
};

var fonts = exports.fonts = {
    large: '24px "Roboto Condensed"',
    small: '16px "Roboto"',
    death: '24px "Permanent Marker"'
};

var canvasProperties = exports.canvasProperties = {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    centerPoint: {
        x: tileSize * tilesWide / 2 - tileSize / 2,
        y: tileSize * tilesHigh / 2 - tileSize / 2
    }
};

var interactionTextArea = exports.interactionTextArea = {
    width: canvasProperties.width,
    height: canvasProperties.height / 3,
    background: colours.black,
    alpha: 0.4,
    badgeOffsetX: 20,
    badgeOffsetY: 40,
    lineHeight: 18
};

var genders = exports.genders = {
    male: 'M',
    female: 'F',
    alien: 'A'
};

var pronouns = exports.pronouns = {
    M: 'him',
    F: 'her',
    A: 'xlem'
};

var posessivePronouns = exports.posessivePronouns = {
    M: 'his',
    F: 'her',
    A: 'xleir'
};

var personCount = exports.personCount = 4;
var evidenceCount = exports.evidenceCount = 3;
var herrings = exports.herrings = 1;
var defaultInhabitanceSize = exports.defaultInhabitanceSize = 2;


},{}],2:[function(require,module,exports){
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

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _inputs = require('./inputs');

var input = _interopRequireWildcard(_inputs);

var _player = require('./player');

var _worldmap = require('./worldmap');

var _constants = require('../constants');

var _terrains = require('./terrains');

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
   *  v0.0.27
   *  07/02/2018
   *
   */

var StartGame = exports.StartGame = function StartGame(locale, people, player, scene, renderer) {
    clearInterval(window.drawScene);

    player = player || new _player.Player();
    scene = scene || new _worldmap.WorldMap(player);
    renderer = renderer || new Renderer('world', _constants.canvasProperties.width, _constants.canvasProperties.height);

    var start = new locale(player, people),
        game = new Game(renderer, scene, _constants.canvasProperties.centerPoint);

    game.scene.setCurrentLocale(start, 'beginningOfGame');

    return game;
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
        this.initTerrainSprites();

        this.draw();
    }

    _createClass(Game, [{
        key: 'initTerrainSprites',
        value: function initTerrainSprites() {
            var terrainTiles = [];
            Object.keys(_terrains.terrains).forEach(function (terrainKey) {
                var terrain = new _terrains.terrains[terrainKey](),
                    tile = new Image();

                if (terrain.image) {
                    tile.src = terrain.image;
                    terrainTiles.push(tile);
                }
            });

            this.terrainSprites = terrainTiles;
        }
    }, {
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

            window.requestAnimationFrame(this.draw.bind(this));
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


},{"../constants":1,"./inputs":3,"./player":9,"./terrains":12,"./util":13,"./worldmap":14}],3:[function(require,module,exports){
'use strict';

/*
 *
 *  XL RPG/Inputs
 *  XL Gaming/Declan Tyson
 *  v0.0.21
 *  06/02/2018
 *
 */

var actions = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right',
    32: 'action',
    27: 'back'
};

window.addEventListener('keydown', function (e) {
    if (!actions[e.keyCode] || !window.game) return;
    window.game.sendInput(actions[e.keyCode]);
});

window.addEventListener('keyup', function (e) {
    if (!window.game) return;
    window.game.sendInput(null);
});


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Interaction = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _scene = require('./scene');

var _constants = require('../constants');

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
   *  XL RPG/Scene-Interaction
   *  XL Gaming/Declan Tyson
   *  v0.0.20
   *  06/02/2018
   *
   */

var Interaction = function (_Scene) {
    _inherits(Interaction, _Scene);

    function Interaction(person) {
        _classCallCheck(this, Interaction);

        var _this = _possibleConstructorReturn(this, (Interaction.__proto__ || Object.getPrototypeOf(Interaction)).call(this));

        _this.lines = [];
        _this.person = person;
        _this.actions.back = _this.returnToWorldMap.bind(_this);

        util.log('Entering interaction with ' + _this.person.name);
        return _this;
    }

    _createClass(Interaction, [{
        key: 'draw',
        value: function draw(ctx) {
            this.drawConversationTextArea(ctx);
            this.drawBadge(ctx);
            this.drawConversation(ctx);
        }
    }, {
        key: 'drawConversationTextArea',
        value: function drawConversationTextArea(ctx) {
            ctx.save();
            ctx.rect(0, _constants.canvasProperties.height - _constants.interactionTextArea.height, _constants.interactionTextArea.width, _constants.interactionTextArea.height);
            ctx.fillStyle = _constants.interactionTextArea.colour;
            ctx.globalAlpha = _constants.interactionTextArea.alpha;
            ctx.fill();
            ctx.restore();
        }
    }, {
        key: 'drawBadge',
        value: function drawBadge(ctx) {
            ctx.font = _constants.fonts.large;
            ctx.fillStyle = _constants.colours.white;
            ctx.fillText(this.person.name, _constants.interactionTextArea.badgeOffsetX, _constants.canvasProperties.height - _constants.interactionTextArea.height + _constants.interactionTextArea.badgeOffsetY);
        }
    }, {
        key: 'drawConversation',
        value: function drawConversation(ctx) {
            var y = _constants.canvasProperties.height - _constants.interactionTextArea.height + _constants.interactionTextArea.badgeOffsetY * 3;
            ctx.font = _constants.fonts.small;
            ctx.fillStyle = _constants.colours.white;
            this.lines.forEach(function (line, index) {
                ctx.fillText(line, _constants.interactionTextArea.badgeOffsetX, y + index * _constants.interactionTextArea.lineHeight);
            });
        }
    }, {
        key: 'returnToWorldMap',
        value: function returnToWorldMap() {
            if (!this.worldMap) return;
            this.game.setScene(this.worldMap);
        }
    }]);

    return Interaction;
}(_scene.Scene);

exports.Interaction = Interaction;


},{"../constants":1,"./scene":10,"./util":13}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Item = undefined;

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _constants = require('../constants');

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
   *  XL RPG/Item
   *  XL Gaming/Declan Tyson
   *  v0.0.22
   *  06/02/2018
   *
   */

var Item = function Item(name, description) {
    _classCallCheck(this, Item);

    this.name = name;
    this.description = description;
    this.colour = _constants.colours.black;
};

exports.Item = Item;


},{"../constants":1,"./util":13}],6:[function(require,module,exports){
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
      *  v0.0.25
      *  07/02/2018
      *
      */

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _constants = require('../constants');

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
                    map[i].push(['Blank']);
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
            this.terrainPaint(startX, startY, width, height, 'Wall');
            this.terrainPaint(doorway.x, doorway.y, 1, 1, 'Doorway');
            this.entrances[doorway.x][doorway.y] = {
                locale: inhabitance,
                entryPoint: 'frontDoor'
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
                this.addInhabitance(inhabitance.x, inhabitance.y, inhabitance.sizeX, inhabitance.sizeY, inhabitance);
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
        var sizeX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _constants.defaultInhabitanceSize;
        var sizeY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _constants.defaultInhabitanceSize;

        _classCallCheck(this, Inhabitance);

        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.doorway = doorway;
        this.inhabitants = [];
        this.sizeX = sizeX;
        this.sizeY = sizeY;
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


},{"../constants":1,"./util":13}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.choosePeople = undefined;

var _constants = require('../constants');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _people = require('../people/people');

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
    util.log('Choosing ' + _constants.personCount + ' people...');
    var person = void 0;
    while (chosenPeople.length < _constants.personCount) {
        person = util.pickRandomProperty(_people.people);
        if (chosenPeople.indexOf(person) === -1) {
            chosenPeople.push(person);
            util.log(person + ' has been chosen.');
        }
    }

    return chosenPeople;
}; /*
    *
    *  XL RPG/People
    *  XL Gaming/Declan Tyson
    *  v0.0.23
    *  06/02/2018
    *
    */


},{"../constants":1,"../people/people":54,"./util":13}],8:[function(require,module,exports){
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
      *  v0.0.23
      *  06/02/2018
      *
      */

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _constants = require('../constants');

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

        this.id = name;
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

                util.log(_this.name + '\'s relationship with ' + _constants.posessivePronouns[_this.gender] + ' ' + relationship.description + ', ' + name + ', goes from ' + oldValue + ' to ' + newValue + '.');
                _this.relationships[name].value = newValue;
            });
        }
    }, {
        key: 'addAcquaintanceRelationship',
        value: function addAcquaintanceRelationship(person) {
            this.relationships[person] = {
                description: 'Acquaintance',
                value: 50
            };
        }
    }]);

    return Person;
}();

exports.Person = Person;


},{"../constants":1,"./util":13}],9:[function(require,module,exports){
'use strict';

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
      *  v0.0.20
      *  06/02/2018
      *
      */

var _constants = require('../constants');

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Player = function () {
    function Player() {
        _classCallCheck(this, Player);

        this.colour = _constants.colours.black;
        this.direction = _constants.directions.down;
    }

    _createClass(Player, [{
        key: 'setPlacement',
        value: function setPlacement(x, y) {
            this.x = x;
            this.y = y;
        }
    }]);

    return Player;
}();

exports.Player = Player;


},{"../constants":1}],10:[function(require,module,exports){
'use strict';

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
      *  v0.0.20
      *  06/02/2018
      *
      */

var _constants = require('../constants');

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
            action: this.empty,
            back: this.empty
        };
    }

    _createClass(Scene, [{
        key: 'empty',
        value: function empty() {
            return null;
        }
    }, {
        key: 'doActions',
        value: function doActions(action) {
            if (!this.game || !action) return;
            this.game.triggerActionTimeout();

            this.actions[action]();
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {}
    }, {
        key: 'setGame',
        value: function setGame(game) {
            this.game = game;
        }
    }]);

    return Scene;
}();

exports.Scene = Scene;


},{"../constants":1}],11:[function(require,module,exports){
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
      *  v0.0.27
      *  07/02/2018
      *
      */

var _constants = require('../constants');

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
        this.image = false;
        this.neighbours = {};
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

        _this2.id = 'Grass';
        _this2.passable = true;
        _this2.colour = _constants.colours.green;
        _this2.image = '/img/grass.png';
        return _this2;
    }

    return Grass;
}(Terrain);

var Water = function (_Terrain3) {
    _inherits(Water, _Terrain3);

    function Water() {
        _classCallCheck(this, Water);

        var _this3 = _possibleConstructorReturn(this, (Water.__proto__ || Object.getPrototypeOf(Water)).call(this));

        _this3.id = 'Water';
        _this3.passable = false;
        _this3.colour = _constants.colours.blue;
        _this3.image = '/img/water.png';
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


},{"../constants":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.terrains = undefined;

var _terrain = require('./terrain');

var terrains = exports.terrains = {
  'Grass': _terrain.Grass,
  'Water': _terrain.Water
}; /*
    *
    *  XL RPG/Terrain
    *  XL Gaming/Declan Tyson
    *  v0.0.27
    *  07/02/2018
    *
    */


},{"./terrain":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 *
 *  XL RPG/Util
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

var dieRoll = exports.dieRoll = function dieRoll(sides) {
    var result = Math.floor(Math.random() * sides);
    return result;
};

var pickRandomProperty = exports.pickRandomProperty = function pickRandomProperty(obj) {
    var result = void 0,
        count = 0;

    for (var prop in obj) {
        if (Math.random() < 1 / ++count) result = prop;
    }
    return result;
};

var log = exports.log = function log(str) {
    var log = document.getElementById('log');
    log.innerHTML += str + '<hr/>';
    log.scrollTop = log.scrollHeight;
};

var clearLog = exports.clearLog = function clearLog() {
    document.getElementById('log').innerHTML = '';
};


},{}],14:[function(require,module,exports){
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

var _terrain2 = require('./terrain');

var terrain = _interopRequireWildcard(_terrain2);

var _constants = require('../constants');

var _scene = require('./scene');

var _interaction = require('./interaction');

var _locales = require('../locales/locales');

var _people = require('../people/people');

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
   *  v0.0.27
   *  07/02/2018
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
        _this.actions.action = _this.checkForInteraction.bind(_this);

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
            this.player.direction = _constants.directions.up;
        }
    }, {
        key: 'moveDown',
        value: function moveDown() {
            if (this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
            this.player.direction = _constants.directions.down;
        }
    }, {
        key: 'moveLeft',
        value: function moveLeft() {
            if (this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
            this.player.direction = _constants.directions.left;
        }
    }, {
        key: 'moveRight',
        value: function moveRight() {
            if (this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
            this.player.direction = _constants.directions.right;
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
                    var _terrain = this.localeMap[x][y],
                        tileX = x * _constants.tileSize - this.offsetX,
                        tileY = y * _constants.tileSize - this.offsetY;

                    if (!_terrain.image) {
                        ctx.beginPath();
                        ctx.fillStyle = _terrain.colour;
                        ctx.strokeStyle = _terrain.colour;
                        ctx.rect(tileX, tileY, _constants.tileSize, _constants.tileSize);
                        ctx.fill();
                        ctx.stroke();
                    } else {
                        var tile = window.game.terrainSprites[_terrain.id];
                        ctx.drawImage(tile, tileX, tileY, _constants.tileSize, _constants.tileSize);
                    }
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
                _this2.localeMap[person.x][person.y].person = person;
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
        key: 'checkForInteraction',
        value: function checkForInteraction() {
            var x = this.player.x,
                y = this.player.y;

            switch (this.player.direction) {
                case 'up':
                    y--;
                    break;
                case 'down':
                    y++;
                    break;
                case 'left':
                    x--;
                    break;
                case 'right':
                    x++;
                    break;
            }

            if (!this.localeMap[x][y].person) return;
            this.startInteraction(this.localeMap[x][y].person);
        }
    }, {
        key: 'startInteraction',
        value: function startInteraction(person) {
            var interaction = new _interaction.Interaction(person);
            interaction.worldMap = this;
            this.game.setScene(interaction);
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

            var localeId = _locales.locales[entrance.locale.id],
                locale = new localeId(this.locale.player, this.locale.people, entrance.locale);

            this.setCurrentLocale(locale, entrance.entryPoint);
        }
    }, {
        key: 'spawnPeople',
        value: function spawnPeople() {
            var _this3 = this;

            if (this.locale.inhabitance === undefined) return;

            this.locale.inhabitance.inhabitants.forEach(function (inhabitant, index) {
                var spawnPoint = _this3.locale.spawnPoints[index];
                if (spawnPoint !== undefined) {
                    var person = new _people.people[inhabitant]();
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

            this.spawnPeople();
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


},{"../constants":1,"../locales/locales":36,"../people/people":54,"./interaction":4,"./scene":10,"./terrain":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BloodyFootprint = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Bloody Footprint
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var BloodyFootprint = function (_Evidence) {
    _inherits(BloodyFootprint, _Evidence);

    function BloodyFootprint(incriminates, location) {
        _classCallCheck(this, BloodyFootprint);

        var _this = _possibleConstructorReturn(this, (BloodyFootprint.__proto__ || Object.getPrototypeOf(BloodyFootprint)).call(this, 'Bloody Footprint', 'a bloody footprint', incriminates, location));

        _this.addMotiveBias('Psychosis', 40);
        _this.addMotiveBias('Passion', 20);
        _this.addMotiveBias('InheritanceScam', 5);
        return _this;
    }

    return BloodyFootprint;
}(_evidence.Evidence);

exports.BloodyFootprint = BloodyFootprint;


},{"./evidence":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BloodyShirt = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Bloody Shirt
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var BloodyShirt = function (_Evidence) {
    _inherits(BloodyShirt, _Evidence);

    function BloodyShirt(incriminates, location) {
        _classCallCheck(this, BloodyShirt);

        var _this = _possibleConstructorReturn(this, (BloodyShirt.__proto__ || Object.getPrototypeOf(BloodyShirt)).call(this, 'Bloody Shirt', 'a bloody shirt', incriminates, location));

        _this.addMotiveBias('Psychosis', 40);
        _this.addMotiveBias('Passion', 20);
        _this.addMotiveBias('InheritanceScam', 5);
        return _this;
    }

    return BloodyShirt;
}(_evidence.Evidence);

exports.BloodyShirt = BloodyShirt;


},{"./evidence":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CondomWrapper = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Condom Wrapper
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var CondomWrapper = function (_Evidence) {
    _inherits(CondomWrapper, _Evidence);

    function CondomWrapper(incriminates, location) {
        _classCallCheck(this, CondomWrapper);

        var _this = _possibleConstructorReturn(this, (CondomWrapper.__proto__ || Object.getPrototypeOf(CondomWrapper)).call(this, 'Condom Wrapper', 'an open, empty condom wrapper', incriminates, location));

        _this.addMotiveBias('Passion', 30);
        return _this;
    }

    return CondomWrapper;
}(_evidence.Evidence);

exports.CondomWrapper = CondomWrapper;


},{"./evidence":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Evidence = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _util = require('../engine/util');

var util = _interopRequireWildcard(_util);

var _item = require('../engine/item');

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
   *  CODENAME: Paradise/Evidence
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var Evidence = function (_Item) {
    _inherits(Evidence, _Item);

    function Evidence(name, description, incriminates, location) {
        _classCallCheck(this, Evidence);

        var _this = _possibleConstructorReturn(this, (Evidence.__proto__ || Object.getPrototypeOf(Evidence)).call(this, name, description));

        _this.incriminates = incriminates;
        _this.location = location;
        _this.motiveBiases = {};
        return _this;
    }

    _createClass(Evidence, [{
        key: 'addMotiveBias',
        value: function addMotiveBias(motiveName, value) {
            this.motiveBiases[motiveName] = value;
        }
    }, {
        key: 'setLocation',
        value: function setLocation(location) {
            this.location = location;
        }
    }]);

    return Evidence;
}(_item.Item);

exports.Evidence = Evidence;


},{"../engine/item":5,"../engine/util":13}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evidences = undefined;

var _will = require("./will");

var _threateningnote = require("./threateningnote");

var _bloodyfootprint = require("./bloodyfootprint");

var _medication = require("./medication");

var _pregnancytest = require("./pregnancytest");

var _condomwrapper = require("./condomwrapper");

var _bloodyshirt = require("./bloodyshirt");

var evidences = exports.evidences = {
  'Will': _will.Will,
  'ThreateningNote': _threateningnote.ThreateningNote,
  'BloodyFootprint': _bloodyfootprint.BloodyFootprint,
  'Medication': _medication.Medication,
  'PregnancyTest': _pregnancytest.PregnancyTest,
  'CondomWrapper': _condomwrapper.CondomWrapper,
  'BloodyShirt': _bloodyshirt.BloodyShirt
}; /*
    *
    *  CODENAME: Paradise/Evidences
    *  XL Gaming/Declan Tyson
    *  v0.0.26
    *  07/02/2018
    *
    */


},{"./bloodyfootprint":15,"./bloodyshirt":16,"./condomwrapper":17,"./medication":22,"./pregnancytest":25,"./threateningnote":27,"./will":28}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Handgun = undefined;

var _murderweapon = require('./murderweapon');

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
   *  CODENAME: Paradise/Handgun
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  06/02/2018
   *
   */

var Handgun = function (_MurderWeapon) {
    _inherits(Handgun, _MurderWeapon);

    function Handgun(incriminates, location) {
        _classCallCheck(this, Handgun);

        return _possibleConstructorReturn(this, (Handgun.__proto__ || Object.getPrototypeOf(Handgun)).call(this, 'Handgun', 'a handgun, still warm from the recent shot', incriminates, location));
    }

    return Handgun;
}(_murderweapon.MurderWeapon);

exports.Handgun = Handgun;


},{"./murderweapon":23}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Knife = undefined;

var _murderweapon = require('./murderweapon');

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
   *  CODENAME: Paradise/Knife
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  06/02/2018
   *
   */

var Knife = function (_MurderWeapon) {
    _inherits(Knife, _MurderWeapon);

    function Knife(incriminates, location) {
        _classCallCheck(this, Knife);

        return _possibleConstructorReturn(this, (Knife.__proto__ || Object.getPrototypeOf(Knife)).call(this, 'Knife', 'a blood-stained kitchen knife', incriminates, location));
    }

    return Knife;
}(_murderweapon.MurderWeapon);

exports.Knife = Knife;


},{"./murderweapon":23}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Medication = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Medication
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var Medication = function (_Evidence) {
    _inherits(Medication, _Evidence);

    function Medication(incriminates, location) {
        _classCallCheck(this, Medication);

        var _this = _possibleConstructorReturn(this, (Medication.__proto__ || Object.getPrototypeOf(Medication)).call(this, 'Schizophrenia Medication', 'medication prescribed to ' + incriminates + ' for acute murderitis', incriminates, location));

        _this.addMotiveBias('Psychosis', 40);
        _this.addMotiveBias('InheritanceScam', 10);
        return _this;
    }

    return Medication;
}(_evidence.Evidence);

exports.Medication = Medication;


},{"./evidence":18}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MurderWeapon = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Murder Weapon
   *  XL Gaming/Declan Tyson
   *  v0.0.23
   *  06/02/2018
   *
   */

var MurderWeapon = function (_Evidence) {
    _inherits(MurderWeapon, _Evidence);

    function MurderWeapon(name, description, incriminates, locale) {
        _classCallCheck(this, MurderWeapon);

        return _possibleConstructorReturn(this, (MurderWeapon.__proto__ || Object.getPrototypeOf(MurderWeapon)).call(this, name, description, incriminates, locale));
    }

    return MurderWeapon;
}(_evidence.Evidence);

exports.MurderWeapon = MurderWeapon;


},{"./evidence":18}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.murderWeapons = undefined;

var _knife = require('./knife');

var _spoon = require('./spoon');

var _handgun = require('./handgun');

var _util = require('../engine/util');

var util = _interopRequireWildcard(_util);

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

var murderWeapons = exports.murderWeapons = {
  'Knife': _knife.Knife,
  'Spoon': _spoon.Spoon,
  'Handgun': _handgun.Handgun
}; /*
    *
    *  CODENAME: Paradise/Murder Weapons
    *  XL Gaming/Declan Tyson
    *  v0.0.25
    *  07/02/2018
    *
    */


},{"../engine/util":13,"./handgun":20,"./knife":21,"./spoon":26}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PregnancyTest = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Pregnancy Test
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var PregnancyTest = function (_Evidence) {
    _inherits(PregnancyTest, _Evidence);

    function PregnancyTest(incriminates, location) {
        _classCallCheck(this, PregnancyTest);

        var _this = _possibleConstructorReturn(this, (PregnancyTest.__proto__ || Object.getPrototypeOf(PregnancyTest)).call(this, 'Pregnancy Test', 'a positive pregnancy test', incriminates, location));

        _this.addMotiveBias('Passion', 50);
        _this.addMotiveBias('InheritanceScam', 15);
        return _this;
    }

    return PregnancyTest;
}(_evidence.Evidence);

exports.PregnancyTest = PregnancyTest;


},{"./evidence":18}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Spoon = undefined;

var _murderweapon = require('./murderweapon');

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
   *  CODENAME: Paradise/Spoon
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  06/02/2018
   *
   */

var Spoon = function (_MurderWeapon) {
    _inherits(Spoon, _MurderWeapon);

    function Spoon(incriminates, location) {
        _classCallCheck(this, Spoon);

        return _possibleConstructorReturn(this, (Spoon.__proto__ || Object.getPrototypeOf(Spoon)).call(this, 'Spoon', 'a jagged rusty spoon', incriminates, location));
    }

    return Spoon;
}(_murderweapon.MurderWeapon);

exports.Spoon = Spoon;


},{"./murderweapon":23}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ThreateningNote = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Threatening Note
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var ThreateningNote = function (_Evidence) {
    _inherits(ThreateningNote, _Evidence);

    function ThreateningNote(incriminates, location) {
        _classCallCheck(this, ThreateningNote);

        var _this = _possibleConstructorReturn(this, (ThreateningNote.__proto__ || Object.getPrototypeOf(ThreateningNote)).call(this, 'Threatening Note', 'an unsigned handwritten note to ' + window.game.victim + ' that reads, "I\'m going to murder you".', incriminates, location));

        _this.addMotiveBias('Psychosis', 40);
        _this.addMotiveBias('Passion', 10);
        _this.addMotiveBias('InheritanceScam', 40);
        return _this;
    }

    return ThreateningNote;
}(_evidence.Evidence);

exports.ThreateningNote = ThreateningNote;


},{"./evidence":18}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Will = undefined;

var _evidence = require('./evidence');

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
   *  CODENAME: Paradise/Evidence/Will
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var Will = function (_Evidence) {
    _inherits(Will, _Evidence);

    function Will(incriminates, location) {
        _classCallCheck(this, Will);

        var _this = _possibleConstructorReturn(this, (Will.__proto__ || Object.getPrototypeOf(Will)).call(this, 'Will', 'a will that names ' + incriminates + ' as the sole heir to ' + window.game.victim + '\'s fortunes', incriminates, location));

        _this.addMotiveBias('InheritanceScam', 50);
        return _this;
    }

    return Will;
}(_evidence.Evidence);

exports.Will = Will;


},{"./evidence":18}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet1 = undefined;

var _islands = require('../islands');

var _grovestreethouse = require('./grovestreethouse');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var GroveStreet1 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet1, _GroveStreetTemplate);

    function GroveStreet1(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet1);

        var _this = _possibleConstructorReturn(this, (GroveStreet1.__proto__ || Object.getPrototypeOf(GroveStreet1)).call(this, player, people, inhabitance));

        _this.id = 'GroveStreet1';
        _this.entryPoints.frontDoor = { x: 48, y: 48 };

        _this.entrances[49][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: 'groveStreet1'
        };

        _this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
        return _this;
    }

    return GroveStreet1;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet1 = GroveStreet1;


},{"../islands":35,"./grovestreethouse":33}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet2 = undefined;

var _islands = require('../islands');

var _grovestreethouse = require('./grovestreethouse');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var GroveStreet2 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet2, _GroveStreetTemplate);

    function GroveStreet2(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet2);

        var _this = _possibleConstructorReturn(this, (GroveStreet2.__proto__ || Object.getPrototypeOf(GroveStreet2)).call(this, player, people, inhabitance));

        _this.id = 'GroveStreet2';
        _this.entryPoints.frontDoor = { x: 26, y: 48 };

        _this.entrances[25][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: 'groveStreet2'
        };

        _this.terrainPaint(25, 48, 1, 1, 'WoodenFloor');
        return _this;
    }

    return GroveStreet2;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet2 = GroveStreet2;


},{"../islands":35,"./grovestreethouse":33}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet3 = undefined;

var _islands = require('../islands');

var _grovestreethouse = require('./grovestreethouse');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var GroveStreet3 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet3, _GroveStreetTemplate);

    function GroveStreet3(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet3);

        var _this = _possibleConstructorReturn(this, (GroveStreet3.__proto__ || Object.getPrototypeOf(GroveStreet3)).call(this, player, people, inhabitance));

        _this.id = 'GroveStreet3';
        _this.entryPoints.frontDoor = { x: 48, y: 48 };

        _this.entrances[49][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: 'groveStreet3'
        };

        _this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
        return _this;
    }

    return GroveStreet3;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet3 = GroveStreet3;


},{"../islands":35,"./grovestreethouse":33}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreet4 = undefined;

var _islands = require('../islands');

var _grovestreethouse = require('./grovestreethouse');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var GroveStreet4 = function (_GroveStreetTemplate) {
    _inherits(GroveStreet4, _GroveStreetTemplate);

    function GroveStreet4(player, people, inhabitance) {
        _classCallCheck(this, GroveStreet4);

        var _this = _possibleConstructorReturn(this, (GroveStreet4.__proto__ || Object.getPrototypeOf(GroveStreet4)).call(this, player, people, inhabitance));

        _this.id = 'GroveStreet4';
        _this.entryPoints.frontDoor = { x: 26, y: 48 };

        _this.entrances[25][48] = {
            locale: new _islands.Islands(player, people),
            entryPoint: 'groveStreet4'
        };

        _this.terrainPaint(25, 48, 1, 1, 'WoodenFloor');
        return _this;
    }

    return GroveStreet4;
}(_grovestreethouse.GroveStreetTemplate);

exports.GroveStreet4 = GroveStreet4;


},{"../islands":35,"./grovestreethouse":33}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroveStreetTemplate = undefined;

var _paradise_locale = require('../../paradise_locale');

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
   *  v0.0.20
   *  05/02/2018
   *
   */

var GroveStreetTemplate = function (_ParadiseInterior) {
    _inherits(GroveStreetTemplate, _ParadiseInterior);

    function GroveStreetTemplate(player, people, inhabitance) {
        _classCallCheck(this, GroveStreetTemplate);

        var _this = _possibleConstructorReturn(this, (GroveStreetTemplate.__proto__ || Object.getPrototypeOf(GroveStreetTemplate)).call(this, player, people, inhabitance));

        _this.initialise(100, 100);

        _this.spawnPoints.push({ x: 33, y: 35 });
        _this.spawnPoints.push({ x: 39, y: 36 });
        _this.spawnPoints.push({ x: 45, y: 32 });
        _this.spawnPoints.push({ x: 28, y: 33 });

        _this.terrainPaint(0, 0, 100, 100, 'Blank');
        _this.terrainPaint(25, 25, 25, 25, 'Wall');
        _this.terrainPaint(26, 26, 11, 23, 'WoodenFloor');
        _this.terrainPaint(38, 26, 11, 23, 'WoodenFloor');
        _this.terrainPaint(37, 37, 1, 1, 'WoodenFloor');
        return _this;
    }

    return GroveStreetTemplate;
}(_paradise_locale.ParadiseInterior);

exports.GroveStreetTemplate = GroveStreetTemplate;


},{"../../paradise_locale":45}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TownHall = undefined;

var _village = require('../village');

var _grovestreethouse = require('./grovestreethouse');

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
   *  XL RPG/Locales/Town Hall
   *  XL Gaming/Declan Tyson
   *  v0.0.25
   *  07/02/2018
   *
   */

var TownHall = function (_GroveStreetTemplate) {
    _inherits(TownHall, _GroveStreetTemplate);

    function TownHall(player, people, inhabitance) {
        _classCallCheck(this, TownHall);

        var _this = _possibleConstructorReturn(this, (TownHall.__proto__ || Object.getPrototypeOf(TownHall)).call(this, player, people, inhabitance));

        _this.id = 'TownHall';
        _this.entryPoints.frontDoor = { x: 48, y: 48 };

        _this.entrances[49][48] = {
            locale: new _village.Village(player, people),
            entryPoint: 'townHall'
        };

        _this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
        return _this;
    }

    return TownHall;
}(_grovestreethouse.GroveStreetTemplate);

exports.TownHall = TownHall;


},{"../village":37,"./grovestreethouse":33}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Islands = undefined;

var _locale = require('../engine/locale');

var _paradise_locale = require('../paradise_locale');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Islands = function (_ParadiseLocale) {
    _inherits(Islands, _ParadiseLocale);

    function Islands(player, people) {
        _classCallCheck(this, Islands);

        var _this = _possibleConstructorReturn(this, (Islands.__proto__ || Object.getPrototypeOf(Islands)).call(this, player, people));

        _this.id = 'Islands';
        _this.entryPoints.beginningOfGame = { x: 56, y: 57 };
        _this.entryPoints.groveStreet1 = { x: 55, y: 60 };
        _this.entryPoints.groveStreet2 = { x: 58, y: 60 };
        _this.entryPoints.groveStreet3 = { x: 55, y: 63 };
        _this.entryPoints.groveStreet4 = { x: 58, y: 63 };

        _this.initialise(300, 300);

        _this.terrainPaint(0, 0, 300, 300, 'Water');
        _this.terrainPaint(52, 57, 10, 20, 'Grass');
        _this.terrainPaint(42, 35, 2, 8, 'Grass');
        _this.terrainPaint(56, 57, 2, 20, 'Road');
        _this.terrainPaint(55, 60, 1, 1, 'Road');
        _this.terrainPaint(58, 60, 1, 1, 'Road');
        _this.terrainPaint(55, 63, 1, 1, 'Road');
        _this.terrainPaint(58, 63, 1, 1, 'Road');

        _this.inhabitances.push(new _locale.Inhabitance('GroveStreet1', '1 Grove Street', 53, 59, { x: 54, y: 60 }), new _locale.Inhabitance('GroveStreet2', '2 Grove Street', 59, 59, { x: 59, y: 60 }), new _locale.Inhabitance('GroveStreet3', '3 Grove Street', 53, 62, { x: 54, y: 63 }), new _locale.Inhabitance('GroveStreet4', '4 Grove Street', 59, 62, { x: 59, y: 63 }));

        _this.drawInhabitances();
        _this.assignPeopleToInhabitances();
        return _this;
    }

    return Islands;
}(_paradise_locale.ParadiseLocale);

exports.Islands = Islands;


},{"../engine/locale":6,"../paradise_locale":45}],36:[function(require,module,exports){
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

var _townhall = require('./interiors/townhall');

var startingMaps = exports.startingMaps = {
    'Village': _village.Village,
    'Islands': _islands.Islands
}; /*
    *
    *  XL RPG/Locales
    *  XL Gaming/Declan Tyson
    *  v0.0.25
    *  07/02/2018
    *
    */

var locales = exports.locales = {
    'Village': _village.Village,
    'Islands': _islands.Islands,
    'GroveStreet1': _grovestreet.GroveStreet1,
    'GroveStreet2': _grovestreet2.GroveStreet2,
    'GroveStreet3': _grovestreet3.GroveStreet3,
    'GroveStreet4': _grovestreet4.GroveStreet4,
    'TownHall': _townhall.TownHall
};


},{"./interiors/1grovestreet":29,"./interiors/2grovestreet":30,"./interiors/3grovestreet":31,"./interiors/4grovestreet":32,"./interiors/townhall":34,"./islands":35,"./village":37}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Village = undefined;

var _locale = require('../engine/locale');

var _paradise_locale = require('../paradise_locale');

var _townhall = require('./interiors/townhall');

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
   *  v0.0.25
   *  07/02/2018
   *
   */

var Village = function (_ParadiseLocale) {
    _inherits(Village, _ParadiseLocale);

    function Village(player, people) {
        _classCallCheck(this, Village);

        var _this = _possibleConstructorReturn(this, (Village.__proto__ || Object.getPrototypeOf(Village)).call(this, player, people));

        _this.entryPoints.beginningOfGame = { x: 30, y: 30 };
        _this.entryPoints.townHall = { x: 31, y: 62 };

        _this.initialise(300, 300);

        _this.terrainPaint(0, 0, 300, 300, 'Water');
        _this.terrainPaint(20, 27, 15, 90, 'Grass');
        _this.terrainPaint(35, 35, 2, 40, 'Grass');
        _this.terrainPaint(37, 37, 2, 36, 'Grass');
        _this.terrainPaint(39, 39, 2, 32, 'Grass');

        _this.inhabitances.push(new _locale.Inhabitance('TownHall', 'Town Hall', 30, 59, { x: 31, y: 62 }, 2, 4));

        _this.drawInhabitances();
        _this.assignPeopleToInhabitances();
        return _this;
    }

    return Village;
}(_paradise_locale.ParadiseLocale);

exports.Village = Village;


},{"../engine/locale":6,"../paradise_locale":45,"./interiors/townhall":34}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InheritanceScam = undefined;

var _motive = require('./motive');

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
   *  CODENAME: Paradise/Motives/Inheritance Scam
   *  XL Gaming/Declan Tyson
   *  v0.0.25
   *  07/02/2018
   *
   */

var InheritanceScam = function (_Motive) {
    _inherits(InheritanceScam, _Motive);

    function InheritanceScam() {
        _classCallCheck(this, InheritanceScam);

        var _this = _possibleConstructorReturn(this, (InheritanceScam.__proto__ || Object.getPrototypeOf(InheritanceScam)).call(this, 'Inheritance Scam', 'Removal of a spouse or family member in order to obtain part or all of their inheritance', []));

        _this.addRelationshipBias('Wife', 20);
        _this.addRelationshipBias('Husband', 20);
        _this.addRelationshipBias('Brother', 25);
        _this.addRelationshipBias('Sister', 25);
        _this.addRelationshipBias('Mother', 30);
        _this.addRelationshipBias('Father', 30);
        return _this;
    }

    return InheritanceScam;
}(_motive.Motive);

exports.InheritanceScam = InheritanceScam;


},{"./motive":39}],39:[function(require,module,exports){
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
 *  CODENAME: Paradise/Motive
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

var Motive = function () {
    function Motive(name, description, evidence) {
        _classCallCheck(this, Motive);

        this.name = name;
        this.description = description;
        this.evidence = evidence;

        this.relationshipBiases = {};
    }

    _createClass(Motive, [{
        key: "addRelationshipBias",
        value: function addRelationshipBias(relationshipName, value) {
            this.relationshipBiases[relationshipName] = value;
        }
    }]);

    return Motive;
}();

exports.Motive = Motive;


},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.motives = undefined;

var _psychosis = require("./psychosis");

var _inheritancescam = require("./inheritancescam");

var _passion = require("./passion");

var motives = exports.motives = {
  'InheritanceScam': _inheritancescam.InheritanceScam,
  'Passion': _passion.Passion,
  'Psychosis': _psychosis.Psychosis
}; /*
    *
    *  CODENAME: Paradise/Motives
    *  XL Gaming/Declan Tyson
    *  v0.0.25
    *  07/02/2018
    *
    */


},{"./inheritancescam":38,"./passion":41,"./psychosis":42}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Passion = undefined;

var _motive = require('./motive');

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
   *  CODENAME: Paradise/Motives/Inheritance Scam
   *  XL Gaming/Declan Tyson
   *  v0.0.25
   *  07/02/2018
   *
   */

var Passion = function (_Motive) {
    _inherits(Passion, _Motive);

    function Passion() {
        _classCallCheck(this, Passion);

        var _this = _possibleConstructorReturn(this, (Passion.__proto__ || Object.getPrototypeOf(Passion)).call(this, 'Crime of Passion', 'Driven by passion to kill a jealous partner or their concubine.', []));

        _this.addRelationshipBias('Wife', 30);
        _this.addRelationshipBias('Husband', 30);
        _this.addRelationshipBias('The Other Woman', 40);
        _this.addRelationshipBias('The Other Man', 40);
        _this.addRelationshipBias('Mistress', 15);
        _this.addRelationshipBias('Toyboy', 15);
        return _this;
    }

    return Passion;
}(_motive.Motive);

exports.Passion = Passion;


},{"./motive":39}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Psychosis = undefined;

var _motive = require('./motive');

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
   *  CODENAME: Paradise/Motives/Inheritance Scam
   *  XL Gaming/Declan Tyson
   *  v0.0.25
   *  07/02/2018
   *
   */

var Psychosis = function (_Motive) {
    _inherits(Psychosis, _Motive);

    function Psychosis() {
        _classCallCheck(this, Psychosis);

        var _this = _possibleConstructorReturn(this, (Psychosis.__proto__ || Object.getPrototypeOf(Psychosis)).call(this, 'Psychotic Break', 'A temporary loss of sense leading to murder.', []));

        _this.addRelationshipBias('Wife', 20);
        _this.addRelationshipBias('Husband', 20);
        _this.addRelationshipBias('Acquaintance', 20);
        _this.addRelationshipBias('Friend', 20);
        _this.addRelationshipBias('Brother', 20);
        _this.addRelationshipBias('Sister', 20);
        _this.addRelationshipBias('Mother', 20);
        _this.addRelationshipBias('Father', 20);
        _this.addRelationshipBias('Son', 20);
        _this.addRelationshipBias('Daughter', 20);
        _this.addRelationshipBias('The Other Woman', 20);
        _this.addRelationshipBias('The Other Man', 20);
        _this.addRelationshipBias('Mistress', 20);
        _this.addRelationshipBias('Toyboy', 20);
        _this.addRelationshipBias('Student', 20);
        _this.addRelationshipBias('Teacher', 20);
        return _this;
    }

    return Psychosis;
}(_motive.Motive);

exports.Psychosis = Psychosis;


},{"./motive":39}],43:[function(require,module,exports){
'use strict';

var _util = require('./engine/util');

var util = _interopRequireWildcard(_util);

var _game = require('./engine/game');

var _player = require('./engine/player');

var _paradise_worldmap = require('./paradise_worldmap');

var _paradise_setup = require('./paradise_setup');

var _people = require('./engine/people');

var _locales = require('./locales/locales');

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

window.startGame = function (locale, people, victim, murderer, weapon, motive) {
    util.clearLog();

    locale = _locales.startingMaps[locale] || _locales.startingMaps[(0, _paradise_setup.chooseStartingMap)()];
    people = people || (0, _people.choosePeople)();

    var player = new _player.Player(),
        worldMap = new _paradise_worldmap.ParadiseWorldMap(player);

    window.game = (0, _game.StartGame)(locale, people, player, worldMap);
    window.game.people = people;
    window.game.victim = victim || (0, _paradise_setup.chooseVictim)(window.game.people);
    window.game.murderer = murderer || (0, _paradise_setup.chooseMurderer)(window.game.victim, window.game.people);
    window.game.weapon = weapon || (0, _paradise_setup.chooseMurderWeapon)();
    window.game.motive = motive || (0, _paradise_setup.chooseMotive)(window.game.victim, window.game.murderer);
    window.game.evidence = (0, _paradise_setup.chooseEvidence)(game);

    util.log('Evidence includes:');
    window.game.evidence.forEach(function (e) {
        util.log('-  ' + e.name + ' (' + e.location + ')');
    });

    document.querySelectorAll('button').forEach(function (button) {
        button.blur();
    });
}; /*
    *
    *  CODENAME: Paradise
    *  XL Gaming/Declan Tyson
    *  v0.0.26
    *  07/02/2018
    *
    */


},{"./engine/game":2,"./engine/people":7,"./engine/player":9,"./engine/util":13,"./locales/locales":36,"./paradise_setup":47,"./paradise_worldmap":48}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParadiseInteraction = undefined;

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

var _util = require('./engine/util');

var util = _interopRequireWildcard(_util);

var _constants = require('./constants');

var _interaction = require('./engine/interaction');

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
   *  CODENAME: Paradise/Scene-Interaction
   *  XL Gaming/Declan Tyson
   *  v0.0.26
   *  07/02/2018
   *
   */

var ParadiseInteraction = function (_Interaction) {
    _inherits(ParadiseInteraction, _Interaction);

    function ParadiseInteraction(person, game) {
        _classCallCheck(this, ParadiseInteraction);

        var _this = _possibleConstructorReturn(this, (ParadiseInteraction.__proto__ || Object.getPrototypeOf(ParadiseInteraction)).call(this, person));

        _this.game = game;

        if (_this.person.victim) {
            var lines = [],
                _person = _this.person,
                weapon = _this.game.weapon;

            lines.push(_person.name + ' is dead.');
            _person.evidence.forEach(function (evidence) {
                lines.push('Lying next to ' + _constants.pronouns[_person.gender] + ' is ' + evidence.description + '.');
            });

            for (var i = 0; i < lines.length; i++) {
                _this.lines.push(lines[i]);
            }
        }
        return _this;
    }

    _createClass(ParadiseInteraction, [{
        key: 'drawBadge',
        value: function drawBadge(ctx) {
            _get(ParadiseInteraction.prototype.__proto__ || Object.getPrototypeOf(ParadiseInteraction.prototype), 'drawBadge', this).call(this, ctx);

            if (this.person.victim) {
                ctx.font = _constants.fonts.death;
                ctx.fillStyle = _constants.colours.red;
                ctx.fillText(_constants.texts.dead, _constants.interactionTextArea.badgeOffsetX, _constants.canvasProperties.height - _constants.interactionTextArea.height + _constants.interactionTextArea.badgeOffsetY * 2);
            }
        }
    }, {
        key: 'returnToWorldMap',
        value: function returnToWorldMap() {
            if (!this.worldMap) return;
            this.game.setScene(this.worldMap);
        }
    }]);

    return ParadiseInteraction;
}(_interaction.Interaction);

exports.ParadiseInteraction = ParadiseInteraction;


},{"./constants":1,"./engine/interaction":4,"./engine/util":13}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParadiseLocale = exports.ParadiseInterior = undefined;

var _util = require('./engine/util');

var util = _interopRequireWildcard(_util);

var _locale = require('./engine/locale');

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
   *  CODENAME: Paradise/Locales/Base
   *  XL Gaming/Declan Tyson
   *  v0.0.23
   *  06/02/2018
   *
   */

var ParadiseLocale = function (_Locale) {
    _inherits(ParadiseLocale, _Locale);

    function ParadiseLocale(player, people) {
        _classCallCheck(this, ParadiseLocale);

        var _this = _possibleConstructorReturn(this, (ParadiseLocale.__proto__ || Object.getPrototypeOf(ParadiseLocale)).call(this, player, people));

        _this.evidence = [];
        return _this;
    }

    return ParadiseLocale;
}(_locale.Locale);

var ParadiseInterior = function (_Interior) {
    _inherits(ParadiseInterior, _Interior);

    function ParadiseInterior(player, people, inhabitance) {
        _classCallCheck(this, ParadiseInterior);

        var _this2 = _possibleConstructorReturn(this, (ParadiseInterior.__proto__ || Object.getPrototypeOf(ParadiseInterior)).call(this, player, people, inhabitance));

        _this2.evidence = [];
        return _this2;
    }

    return ParadiseInterior;
}(_locale.Interior);

exports.ParadiseInterior = ParadiseInterior;
exports.ParadiseLocale = ParadiseLocale;


},{"./engine/locale":6,"./engine/util":13}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParadisePerson = undefined;

var _util = require('./engine/util');

var util = _interopRequireWildcard(_util);

var _person = require('./engine/person');

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
   *  XL RPG/Person
   *  XL Gaming/Declan Tyson
   *  v0.0.23
   *  06/02/2018
   *
   */

var ParadisePerson = function (_Person) {
    _inherits(ParadisePerson, _Person);

    function ParadisePerson(name, gender) {
        _classCallCheck(this, ParadisePerson);

        var _this = _possibleConstructorReturn(this, (ParadisePerson.__proto__ || Object.getPrototypeOf(ParadisePerson)).call(this, name, gender));

        _this.evidence = [];
        return _this;
    }

    return ParadisePerson;
}(_person.Person);

exports.ParadisePerson = ParadisePerson;


},{"./engine/person":8,"./engine/util":13}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomInnocentPerson = exports.chooseMurderWeapon = exports.chooseEvidence = exports.chooseStartingMap = exports.chooseMotive = exports.chooseMurderer = exports.chooseVictim = undefined;

var _util = require("./engine/util");

var util = _interopRequireWildcard(_util);

var _people = require("./people/people");

var _locales = require("./locales/locales");

var _constants = require("./constants");

var _murderweapons = require("./evidence/murderweapons");

var _evidences = require("./evidence/evidences");

var _motives = require("./motives/motives");

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
 *  CODENAME: Paradise/Setup
 *  XL Gaming/Declan Tyson
 *  v0.0.27
 *  07/02/2018
 *
 */

var chooseVictim = exports.chooseVictim = function chooseVictim(chosenPeople) {
    var victim = chosenPeople[util.dieRoll(chosenPeople.length - 1)];
    util.log(victim + " is the unlucky one.");
    return victim;
};

var chooseMurderer = exports.chooseMurderer = function chooseMurderer(victimName, chosenPeople) {
    var trueRandom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var victim = new _people.people[victimName]();
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

    util.log(victim.name + "'s murderer is " + _constants.posessivePronouns[victim.gender] + " " + relationship.description + ", " + murderer + "!!!");

    return murderer;
};

var chooseMotive = exports.chooseMotive = function chooseMotive(victimKey, murderer) {
    var potentialMotives = [],
        victim = new _people.people[victimKey]();

    if (!(murderer in victim.relationships)) victim.addAcquaintanceRelationship(murderer);

    var relationship = victim.relationships[murderer];

    Object.keys(_motives.motives).forEach(function (motiveKey) {
        var motive = new _motives.motives[motiveKey]();

        if (relationship.description in motive.relationshipBiases) {
            for (var i = 0; i < motive.relationshipBiases[relationship.description]; i++) {
                potentialMotives.push(motiveKey);
            }
        }
    });

    var motive = potentialMotives[util.dieRoll(potentialMotives.length)];
    util.log("The motive was " + motive + ".");
    return motive;
};

var chooseStartingMap = exports.chooseStartingMap = function chooseStartingMap() {
    var locale = util.pickRandomProperty(_locales.startingMaps);
    util.log('Choosing starting map...');
    util.log("Map is " + locale + ".");
    return locale;
};

var chooseEvidence = exports.chooseEvidence = function chooseEvidence(game) {
    var potentialEvidence = [],
        chosenEvidenceKeys = [],
        chosenEvidence = [],
        weapon = whatHappensToTheWeapon(game);

    if (weapon) chosenEvidence.push(weapon);

    Object.keys(_evidences.evidences).forEach(function (evidenceKey) {
        var evidence = new _evidences.evidences[evidenceKey](game.murderer);

        if (game.motive in evidence.motiveBiases) {
            for (var i = 0; i < evidence.motiveBiases[game.motive]; i++) {
                potentialEvidence.push(evidenceKey);
            }
        }
    });

    while (chosenEvidenceKeys.length < _constants.evidenceCount) {
        var evidence = potentialEvidence[util.dieRoll(potentialEvidence.length)];
        if (chosenEvidenceKeys.indexOf(evidence) === -1) chosenEvidenceKeys.push(evidence);
    }

    var _loop = function _loop(i) {
        var incriminates = game.murderer,
            inhabitances = game.scene.locale.inhabitances,
            location = inhabitances[(0, _util.dieRoll)(inhabitances.length - 1)].id;

        if (i < _constants.herrings) incriminates = randomInnocentPerson(game);

        /* jshint ignore:start */
        if ((0, _util.dieRoll)(2)) {
            // Plant it on the suspect
            inhabitances.forEach(function (inhabitance, index) {
                if (inhabitance.inhabitants.indexOf(incriminates) !== -1) location = inhabitances[index].id;
            });
        }
        /* jshint ignore:end */

        var evidence = new _evidences.evidences[chosenEvidenceKeys[i]](incriminates, location);
        chosenEvidence.push(evidence);
    };

    for (var i = 0; i < chosenEvidenceKeys.length; i++) {
        _loop(i);
    }

    return chosenEvidence;
};

var chooseMurderWeapon = exports.chooseMurderWeapon = function chooseMurderWeapon() {
    var weapon = util.pickRandomProperty(_murderweapons.murderWeapons);
    util.log("The murder weapon is a " + weapon + ".");
    return weapon;
};

var whatHappensToTheWeapon = function whatHappensToTheWeapon(game) {
    var weapon = null,
        inhabitances = game.scene.locale.inhabitances,
        implicates = game.murderer,
        inhabitanceIndex = (0, _util.dieRoll)(inhabitances.length - 1);

    if (util.dieRoll(10) === 0) implicates = false; // Muddied evidence - also TODO hard mode

    switch (util.dieRoll(3)) {
        case 0:
            // On the victim
            weapon = new _murderweapons.murderWeapons[game.weapon](implicates, game.victim);
            break;
        case 1:
            // In the murderer's inhabitance
            inhabitances.forEach(function (inhabitance, index) {
                if (inhabitance.inhabitants.indexOf(game.murderer) !== -1) inhabitanceIndex = index;
            });
            weapon = new _murderweapons.murderWeapons[game.weapon](implicates, inhabitances[inhabitanceIndex].id);
            break;
        case 2:
            // Randomly hidden
            weapon = new _murderweapons.murderWeapons[game.weapon](implicates, inhabitances[inhabitanceIndex].id);
            break;
    }

    return weapon;
};

var randomInnocentPerson = exports.randomInnocentPerson = function randomInnocentPerson(game) {
    var person = false;
    while (!person) {
        person = game.people[util.dieRoll(game.people.length - 1)];
        if (person === game.murderer || person === game.victim) person = false;
    }

    return person;
};


},{"./constants":1,"./engine/util":13,"./evidence/evidences":19,"./evidence/murderweapons":24,"./locales/locales":36,"./motives/motives":40,"./people/people":54}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParadiseWorldMap = undefined;

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

var _worldmap = require('./engine/worldmap');

var _people = require('./people/people');

var _paradise_interaction = require('./paradise_interaction');

var _util = require('./engine/util');

var util = _interopRequireWildcard(_util);

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
   *  CODENAME: Paradise/World Map
   *  XL Gaming/Declan Tyson
   *  v0.0.27
   *  07/02/2018
   *
   */

var ParadiseWorldMap = function (_WorldMap) {
    _inherits(ParadiseWorldMap, _WorldMap);

    function ParadiseWorldMap(player) {
        _classCallCheck(this, ParadiseWorldMap);

        return _possibleConstructorReturn(this, (ParadiseWorldMap.__proto__ || Object.getPrototypeOf(ParadiseWorldMap)).call(this, player));
    }

    _createClass(ParadiseWorldMap, [{
        key: 'draw',
        value: function draw(ctx) {
            _get(ParadiseWorldMap.prototype.__proto__ || Object.getPrototypeOf(ParadiseWorldMap.prototype), 'draw', this).call(this, ctx);
            this.drawEvidence(ctx);
        }
    }, {
        key: 'spawnPeople',
        value: function spawnPeople() {
            var _this2 = this;

            if (this.locale.inhabitance === undefined) return;

            this.locale.inhabitance.inhabitants.forEach(function (inhabitant, index) {
                var spawnPoint = _this2.locale.spawnPoints[index];
                if (spawnPoint !== undefined) {
                    var person = new _people.people[inhabitant]();
                    person.x = spawnPoint.x;
                    person.y = spawnPoint.y;

                    if (person.name === _this2.game.victim) person.victim = true;
                    if (person.name === _this2.game.murderer) person.murderer = true;

                    _this2.plantEvidence(person);

                    _this2.presentPeople.push(person);
                }
            });

            this.plantEvidence(this.locale);
        }
    }, {
        key: 'startInteraction',
        value: function startInteraction(person) {
            var interaction = new _paradise_interaction.ParadiseInteraction(person, this.game);
            interaction.worldMap = this;
            this.game.setScene(interaction);
        }
    }, {
        key: 'plantEvidence',
        value: function plantEvidence(location) {
            this.game.evidence.forEach(function (evidence) {
                if (location.id === evidence.location) {
                    location.evidence.push(evidence);
                    util.log(evidence.name + ' is hidden here!');
                }
            });
        }
    }, {
        key: 'drawEvidence',
        value: function drawEvidence(ctx) {}
    }]);

    return ParadiseWorldMap;
}(_worldmap.WorldMap);

exports.ParadiseWorldMap = ParadiseWorldMap;


},{"./engine/util":13,"./engine/worldmap":14,"./paradise_interaction":44,"./people/people":54}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Evelyn = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Evelyn = function (_ParadisePerson) {
    _inherits(Evelyn, _ParadisePerson);

    function Evelyn() {
        _classCallCheck(this, Evelyn);

        return _possibleConstructorReturn(this, (Evelyn.__proto__ || Object.getPrototypeOf(Evelyn)).call(this, 'Evelyn', _constants.genders.female));
    }

    return Evelyn;
}(_paradise_person.ParadisePerson);

exports.Evelyn = Evelyn;


},{"../constants":1,"../paradise_person":46}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Jill = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.24
   *  06/02/2018
   *
   */

var Jill = function (_ParadisePerson) {
    _inherits(Jill, _ParadisePerson);

    function Jill() {
        _classCallCheck(this, Jill);

        var _this = _possibleConstructorReturn(this, (Jill.__proto__ || Object.getPrototypeOf(Jill)).call(this, 'Jill', _constants.genders.female));

        _this.relationships = {
            'John': {
                description: 'Husband',
                value: 45
            }
        };
        return _this;
    }

    return Jill;
}(_paradise_person.ParadisePerson);

exports.Jill = Jill;


},{"../constants":1,"../paradise_person":46}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.John = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.24
   *  06/02/2018
   *
   */

var John = function (_ParadisePerson) {
    _inherits(John, _ParadisePerson);

    function John() {
        _classCallCheck(this, John);

        var _this = _possibleConstructorReturn(this, (John.__proto__ || Object.getPrototypeOf(John)).call(this, 'John', _constants.genders.male));

        _this.relationships = {
            'Jill': {
                description: 'Wife',
                value: 45
            }
        };
        return _this;
    }

    return John;
}(_paradise_person.ParadisePerson);

exports.John = John;


},{"../constants":1,"../paradise_person":46}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Neil = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Neil = function (_ParadisePerson) {
    _inherits(Neil, _ParadisePerson);

    function Neil() {
        _classCallCheck(this, Neil);

        return _possibleConstructorReturn(this, (Neil.__proto__ || Object.getPrototypeOf(Neil)).call(this, 'Neil', _constants.genders.male));
    }

    return Neil;
}(_paradise_person.ParadisePerson);

exports.Neil = Neil;


},{"../constants":1,"../paradise_person":46}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pauline = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Pauline = function (_ParadisePerson) {
    _inherits(Pauline, _ParadisePerson);

    function Pauline() {
        _classCallCheck(this, Pauline);

        return _possibleConstructorReturn(this, (Pauline.__proto__ || Object.getPrototypeOf(Pauline)).call(this, 'Pauline', _constants.genders.female));
    }

    return Pauline;
}(_paradise_person.ParadisePerson);

exports.Pauline = Pauline;


},{"../constants":1,"../paradise_person":46}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.people = undefined;

var _evelyn = require('./evelyn');

var _jill = require('./jill');

var _john = require('./john');

var _neil = require('./neil');

var _pauline = require('./pauline');

var _petey = require('./petey');

var _quazar = require('./quazar');

var _zenith = require('./zenith');

/*
 *
 *  CODENAME: Paradise/People
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

var people = exports.people = {
    'Evelyn': _evelyn.Evelyn,
    'Jill': _jill.Jill,
    'John': _john.John,
    'Neil': _neil.Neil,
    'Pauline': _pauline.Pauline,
    'Petey': _petey.Petey,
    'Quazar': _quazar.Quazar,
    'Zenith': _zenith.Zenith
};


},{"./evelyn":49,"./jill":50,"./john":51,"./neil":52,"./pauline":53,"./petey":55,"./quazar":56,"./zenith":57}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Petey = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Petey = function (_ParadisePerson) {
    _inherits(Petey, _ParadisePerson);

    function Petey() {
        _classCallCheck(this, Petey);

        return _possibleConstructorReturn(this, (Petey.__proto__ || Object.getPrototypeOf(Petey)).call(this, 'Petey', _constants.genders.male));
    }

    return Petey;
}(_paradise_person.ParadisePerson);

exports.Petey = Petey;


},{"../constants":1,"../paradise_person":46}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Quazar = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Quazar = function (_ParadisePerson) {
    _inherits(Quazar, _ParadisePerson);

    function Quazar() {
        _classCallCheck(this, Quazar);

        var _this = _possibleConstructorReturn(this, (Quazar.__proto__ || Object.getPrototypeOf(Quazar)).call(this, 'Quazar', _constants.genders.alien));

        _this.colour = _constants.colours.green;
        _this.relationships = {
            'Zenith': {
                description: 'Brother',
                value: 85
            }
        };
        return _this;
    }

    return Quazar;
}(_paradise_person.ParadisePerson);

exports.Quazar = Quazar;


},{"../constants":1,"../paradise_person":46}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Zenith = undefined;

var _constants = require('../constants');

var _paradise_person = require('../paradise_person');

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
   *  v0.0.23
   *  06/02/2018
   *
   */

var Zenith = function (_ParadisePerson) {
    _inherits(Zenith, _ParadisePerson);

    function Zenith() {
        _classCallCheck(this, Zenith);

        var _this = _possibleConstructorReturn(this, (Zenith.__proto__ || Object.getPrototypeOf(Zenith)).call(this, 'Zenith', _constants.genders.alien));

        _this.colour = _constants.colours.green;
        _this.relationships = {
            'Quazar': {
                description: 'Brother',
                value: 85
            }
        };
        return _this;
    }

    return Zenith;
}(_paradise_person.ParadisePerson);

exports.Zenith = Zenith;


},{"../constants":1,"../paradise_person":46}]},{},[1,44,45,46,47,48,43]);
