var Paradise = (function (exports) {
'use strict';

/*
 *
 *  Paradise/Inputs
 *  Declan Tyson
 *  v0.0.21
 *  06/02/2018
 *
 */

const actions = {
    38 :    'up',
    40 :    'down',
    37 :    'left',
    39 :    'right',
    32 :    'action',
    27 :    'back'
};

window.addEventListener('keydown', (e) => {
    if(!actions[e.keyCode] || !window.game) return;
    window.game.sendInput(actions[e.keyCode]);
});

window.addEventListener('keyup', (e) => {
    if(!window.game) return;
    window.game.sendInput(null);
});

/*
 *
 *  Paradise/Util
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Util {
    static dieRoll(sides) {
        return Math.floor(Math.random() * (sides));
    }

    static pickRandomProperty(obj) {
        let result,
            count = 0;

        for (let prop in obj) {
            if (Math.random() < 1 / ++count) result = prop;
        }
        return result;
    }

    static log(str) {
        let log = document.getElementById('log');
        log.innerHTML += `${str}<hr/>`;
        log.scrollTop = log.scrollHeight;
    }

    static clearLog() {
        document.getElementById('log').innerHTML = '';
    }
}

/*
 *
 *  Paradise/Settings
 *  Declan Tyson
 *  v0.0.40
 *  13/02/2018
 *
 */

let settings = {
    fps : 45,
    actionTimeoutLimit : 2,
    terrain: {
        tileSize: 20,
        tilesWide: 50,
        tilesHigh: 28
    },
    character : {
        spriteSize: 40,
        frameSize: 64,
        frameCount: 9,
        stepsPerTile: 2
    },
    personCount : 4,
    defaultInhabitanceSize : 2
};

let canvasProperties = {
    width: settings.terrain.tileSize * settings.terrain.tilesWide,
    height: settings.terrain.tileSize * settings.terrain.tilesHigh,
    centerPoint: {
        x: ((settings.terrain.tileSize * settings.terrain.tilesWide) / 2) - (settings.terrain.tileSize / 2),
        y: ((settings.terrain.tileSize * settings.terrain.tilesHigh) / 2) - (settings.terrain.tileSize / 2)
    }
};

let tileStep = (settings.terrain.tileSize / settings.character.stepsPerTile);

/*
 *
 *  Paradise/Constants
 *  Declan Tyson
 *  v0.0.37
 *  12/02/2018
 *
 */

const colours = {
    black : '#000000',
    white: '#FFFFFF',
    green: '#00AA00',
    blue: '#0000AA',
    brown: '#4f1f0b',
    darkbrown: '#291006',
    grey: '#cdcdcd',
    red: '#ff0000'
};

const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

const fonts = {
    large: '24px "Roboto Condensed"',
    small: '16px "Roboto"',
    death: '24px "Permanent Marker"'
};

const interactionTextArea = {
    width: canvasProperties.width,
    height: canvasProperties.height / 3,
    background: colours.black,
    alpha: 0.4,
    badgeOffsetX: 20,
    badgeOffsetY: 40,
    lineHeight: 18
};

const genders = {
    male   : 'M',
    female : 'F',
    alien  : 'A'
};



const posessivePronouns = {
    M   : 'his',
    F   : 'her',
    A   : 'xleir'
};

/*
 *
 *  Paradise/Item
 *  Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.colour = colours.black;
    }
}

/*
 *
 *  Paradise/Player
 *  Declan Tyson
 *  v0.0.40
 *  13/02/2018
 *
 */

class Player {
    constructor() {
        this.colour = colours.black;
        this.direction = directions.down;
        this.stepX = 0;
        this.stepY = 0;

        let sprite_test = new Image(),
            spriteMap_test = {};

        sprite_test.src = '/oob/char_test.png';
        spriteMap_test[directions.up] = 0;
        spriteMap_test[directions.down] = 128;
        spriteMap_test[directions.left] = 64;
        spriteMap_test[directions.right] = 192;

        this.spriteMap = spriteMap_test;
        this.sprite = {
            image : sprite_test,
            x : 0,
            y : 128
        };
    }

    advanceFrame() {
        let newSpriteX = this.sprite.x + settings.character.frameSize;
        if(newSpriteX >= settings.character.frameSize * settings.character.frameCount) {
            newSpriteX = 0;
        }

        this.sprite.x = newSpriteX;
    }

    resetSprite() {
        this.sprite.x = 0;
    }

    setPlacement(x, y, init = false) {
        if(x !== this.x) {
            if (this.stepX >= settings.character.stepsPerTile || this.stepX < 0 || init) {
                this.x = x;
                if(this.stepX >= settings.character.stepsPerTile) this.stepX = 0;
                if(this.stepX < 0) this.stepX = settings.character.stepsPerTile - 1;
            } else {
                if(x > this.x) this.stepX++;
                if(x < this.x) this.stepX--;
            }
        }

        if(y !== this.y) {
            if (this.stepY >= settings.character.stepsPerTile || this.stepY < 0 || init) {
                this.y = y;
                if(this.stepY >= settings.character.stepsPerTile) this.stepY = 0;
                if(this.stepY < 0) this.stepY = settings.character.stepsPerTile - 1;
            } else {
                if(y > this.y) this.stepY++;
                if(y < this.y) this.stepY--;
            }
        }

    }

    setDirection(direction) {
        this.direction = direction;
        this.sprite.y = this.spriteMap[direction];
    }
}

/*
 *
 *  Paradise/Terrain
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

class Terrain {
    constructor(neighbours, spriteFolder = '/oob') {
        this.encounters = [];
        this.image = false;
        this.spriteFolder = spriteFolder;
        this.fallbackImage = `${this.spriteFolder}/fallback.png`;
        this.neighbours = neighbours;

        this.pickImage(neighbours);
    }

    isPassable() {
        return this.passable;
    }

    hasEncounters() {
        return this.encounters;
    }

    pickImage(neighbours) {
        if(!neighbours || this.spriteFolder === '/oob') return;

        let filename = '';
        Object.keys(neighbours).forEach((neighbourKey) => {
            if(filename !== '') filename += '_';
            filename += `${neighbourKey}_${neighbours[neighbourKey]}`;
        });
        filename = filename.toLowerCase();
        this.image = `${this.spriteFolder}/${filename}.png`;
    }
}

class Blank extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Blank';
        this.passable = false;
        this.colour = colours.black;
    }
}

class Grass extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/Grass');
        this.id = 'Grass';
        this.passable = true;
        this.colour = colours.green;
    }
}

class Water extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/Water');
        this.id = 'Water';
        this.passable = false;
        this.colour = colours.blue;
    }
}

class VerticalRoad extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/VerticalRoad');
        this.id = 'VerticalRoad';
        this.passable = true;
        this.colour = colours.grey;
    }
}

class HorizontalRoad extends Terrain {
    constructor(neighbours) {
        super(neighbours, '/oob/HorizontalRoad');
        this.id = 'HorizontalRoad';
        this.passable = true;
        this.colour = colours.grey;
    }
}

class Wall extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Wall';
        this.passable = false;
        this.colour = colours.brown;
    }
}

class Doorway extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'Doorway';
        this.passable = true;
        this.colour = colours.darkbrown;
    }
}

class WoodenFloor extends Terrain {
    constructor(neighbours) {
        super(neighbours);
        this.id = 'WoodenFloor';
        this.passable = true;
        this.colour = colours.darkbrown;
    }
}

/*
 *
 *  Paradise/Terrain
 *  Declan Tyson
 *  v0.0.38
 *  08/02/2018
 *
 */

let terrains = {
    'Blank' : Blank,
    'Grass' : Grass,
    'Water' : Water,
    'Wall' : Wall,
    'VerticalRoad' : VerticalRoad,
    'HorizontalRoad' : HorizontalRoad,
    'Doorway' : Doorway,
    'WoodenFloor' : WoodenFloor
};

/*
 *
 *  Paradise/Scene
 *  Declan Tyson
 *  v0.0.37
 *  12/02/2018
 *
 */

class Scene {
    constructor() {
        this.actions = {
            up:     this.empty,
            down:   this.empty,
            left:   this.empty,
            right:  this.empty,
            action: this.empty,
            back:   this.empty
        };
    }

    empty() {
        return null;
    }

    doActions(action) {
        if(!this.game || !action) return;
        this.game.triggerActionTimeout();

        this.actions[action]();
    }

    draw(ctx) {

    }

    setGame(game) {
        this.game = game;
    }
}

/*
 *
 *  Paradise/Scene-Interaction
 *  Declan Tyson
 *  v0.0.40
 *  13/02/2018
 *
 */

class Interaction extends Scene {
    constructor(person) {
        super();

        this.lines = [];
        this.person = person;
        this.actions.back = this.returnToWorldMap.bind(this);

        Util.log(`Entering interaction with ${this.person.name}`);
    }

    draw(ctx) {
        // World map should be overlaid
        this.worldMap.draw(ctx);

        this.drawConversationTextArea(ctx);
        this.drawBadge(ctx);
        this.drawConversation(ctx);
    }

    drawConversationTextArea(ctx) {
        ctx.save();
        ctx.rect(0, canvasProperties.height - interactionTextArea.height, interactionTextArea.width, interactionTextArea.height);
        ctx.fillStyle = interactionTextArea.colour;
        ctx.globalAlpha = interactionTextArea.alpha;
        ctx.fill();
        ctx.restore();
    }

    drawBadge(ctx) {
        ctx.font = fonts.large;
        ctx.fillStyle = colours.white;
        ctx.fillText(this.person.name, interactionTextArea.badgeOffsetX, canvasProperties.height - interactionTextArea.height + interactionTextArea.badgeOffsetY);
    }

    drawConversation(ctx) {
        let y = canvasProperties.height - interactionTextArea.height + (interactionTextArea.badgeOffsetY) * 3;
        ctx.font = fonts.small;
        ctx.fillStyle = colours.white;
        this.lines.forEach((line, index) => {
            ctx.fillText(line, interactionTextArea.badgeOffsetX, y + (index * interactionTextArea.lineHeight));
        });
    }

    returnToWorldMap() {
        if(!this.worldMap) return;
        this.game.setScene(this.worldMap);
    }
}

/*
 *
 *  Paradise/Scene-WorldMap
 *  Declan Tyson
 *  v0.0.40
 *  13/02/2018
 *
 */

class WorldMap extends Scene {
    constructor(player) {
        super();
        this.player = player;

        this.actions.up = this.moveUp.bind(this);
        this.actions.down = this.moveDown.bind(this);
        this.actions.left = this.moveLeft.bind(this);
        this.actions.right = this.moveRight.bind(this);
        this.actions.action = this.checkForInteraction.bind(this);

        this.visitedLocales = {};
        this.presentPeople = [];
    }

    doActions(action) {
        super.doActions(action);

        if(!action) {
            this.player.resetSprite();
            return;
        }
        this.checkForRandomEncounters();
        this.checkForEntrance();
    }

    moveUp() {
        if(this.localeMap[this.player.x][this.player.y - 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y - 1);
        this.player.setDirection(directions.up);
        this.player.advanceFrame();
        console.log(this.player.y, this.player.stepY);
    }

    moveDown() {
        if(this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
        this.player.setDirection(directions.down);
        this.player.advanceFrame();
    }

    moveLeft() {
        if(this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
        this.player.setDirection(directions.left);
        this.player.advanceFrame();
    }

    moveRight() {
        if(this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
        this.player.setDirection(directions.right);
        this.player.advanceFrame();
    }

    draw(ctx) {
        /*
        * This was a performance experiment that didn't work properly... keeping it here in case we need it later
        * and it's also pretty handy for debugging
        */

        /*if(
            this.offsetX === this.player.x * settings.terrain.tileSize - this.game.centerPoint.x &&
            this.offsetY === this.player.y * settings.terrain.tileSize - this.game.centerPoint.y
        ) {
            this.game.redraw = false;
            return;
        }*/

        this.game.redraw = true;

        this.offsetX = this.player.x * settings.terrain.tileSize - this.game.centerPoint.x;
        this.offsetY = this.player.y * settings.terrain.tileSize - this.game.centerPoint.y;
        this.viewportStartX = this.player.x - (settings.terrain.tilesWide / 2);
        this.viewportStartY = this.player.y - (settings.terrain.tilesHigh / 2);

        this.drawLocale(ctx);
        this.drawPeople(ctx);
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        // Player is always at center of screen
        let sprite = this.player.sprite,
            playerX = this.game.centerPoint.x - (settings.terrain.tileSize/2),
            playerY = this.game.centerPoint.y - settings.terrain.tileSize;

        ctx.drawImage(sprite.image, sprite.x, sprite.y , 64, 64, playerX, playerY, settings.character.spriteSize, settings.character.spriteSize);
    }

    drawLocale(ctx) {
        if(!this.locale || this.game.loading) return;

        let viewportStartX = this.viewportStartX - 1,
            viewportStartY = this.viewportStartY - 1;

        if(viewportStartX < 0) viewportStartX = 0;
        if(viewportStartY < 0) viewportStartY = 0;
        if(viewportStartX >= this.locale.width) viewportStartX = this.locale.width;
        if(viewportStartY >= this.locale.height) viewportStartY = this.locale.height;

        let viewportEndX = viewportStartX + settings.terrain.tilesWide + 2,
            viewportEndY = viewportStartY + settings.terrain.tilesHigh + 2;

        if(viewportEndX >= this.locale.width) viewportEndX = this.locale.width;
        if(viewportEndY >= this.locale.height) viewportEndY = this.locale.height;

        for(let x = viewportStartX; x <= viewportEndX; x++) {
            for(let y = viewportStartY; y <= viewportEndY; y++) {

                let terrain = this.localeMap[x][y];
                if(typeof terrain !== "undefined") {
                    let tileX = x * settings.terrain.tileSize - this.offsetX,
                        tileY = y * settings.terrain.tileSize - this.offsetY,
                        offsetX = this.player.stepX * tileStep,
                        offsetY = this.player.stepY * tileStep,
                        tile = window.game.terrainSprites[terrain.image];

                    if (!tile) {
                        ctx.beginPath();
                        ctx.fillStyle = terrain.colour;
                        ctx.strokeStyle = terrain.colour;
                        ctx.rect(tileX - offsetX, tileY - offsetY, settings.terrain.tileSize, settings.terrain.tileSize);
                        ctx.fill();
                        ctx.stroke();
                    } else {
                        ctx.strokeStyle = null;
                        ctx.drawImage(tile, 0, 0, 45, 45, tileX - offsetX, tileY - offsetY, settings.terrain.tileSize, settings.terrain.tileSize);
                    }
                }
            }
        }
    }

    drawPeople(ctx) {
        if(this.presentPeople.length === 0) return;

        let playerOffsetX = this.player.stepX * tileStep,
            playerOffsetY = this.player.stepY * tileStep;

        this.presentPeople.forEach((person) => {
            let personX = person.x * settings.terrain.tileSize - this.offsetX - playerOffsetX,
                personY = person.y * settings.terrain.tileSize - this.offsetY - playerOffsetY;

            ctx.beginPath();
            ctx.rect(personX, personY, settings.terrain.tileSize, settings.terrain.tileSize);
            ctx.strokeStyle = person.colour;
            ctx.fillStyle = person.colour;
            ctx.fill();
            ctx.stroke();

            this.localeMap[person.x][person.y].passable = false;
            this.localeMap[person.x][person.y].person = person;
        });
    }

    checkForRandomEncounters() {
        let potentialRandomEncounter = this.locale.encounters[this.player.x][this.player.y];
        if(!potentialRandomEncounter) return;

        let chance = Math.ceil(Math.random() * potentialRandomEncounter.rate);
        if(chance === potentialRandomEncounter.rate) {
            this.startRandomEncounter(potentialRandomEncounter.enemies);
        }
    }

    startRandomEncounter(enemies) {
        this.game.setScene(new Encounter(enemies));
    }

    checkForInteraction() {
        let x = this.player.x,
            y = this.player.y;

        switch(this.player.direction) {
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

        if(!this.localeMap[x][y].person) return;
        this.startInteraction(this.localeMap[x][y].person);
    }

    startInteraction(person) {
        let interaction = new Interaction(person);
        interaction.worldMap = this;
        this.game.setScene(interaction);
    }

    checkForEntrance() {
        let entrance = this.locale.entrances[this.player.x][this.player.y];
        if(!entrance) return;

        this.enter(entrance);
    }

    enter(entrance) {
        this.presentPeople = [];

        if(typeof this.visitedLocales[entrance.locale.id] !== 'undefined') {
            this.setCurrentLocale(this.visitedLocales[entrance.locale.id], entrance.entryPoint);
            return;
        }

        let localeId = window.game.locales[entrance.locale.id],
            locale = new localeId(this.locale.player, this.locale.people, entrance.locale);

        this.setCurrentLocale(locale, entrance.entryPoint);
    }

    spawnPeople() {
        if(this.locale.inhabitance === undefined) return;

        this.locale.inhabitance.inhabitants.forEach((inhabitant, index) => {
            let spawnPoint = this.locale.spawnPoints[index];
            if(spawnPoint !== undefined) {
                let person = new window.game.people[inhabitant]();
                person.x = spawnPoint.x;
                person.y = spawnPoint.y;
                this.presentPeople.push(person);
            }
        });
    }

    setCurrentLocale(locale, entryPoint, rasterize = true) {
        this.visitedLocales[locale.id] = locale;

        this.locale = locale;
        this.localeMap = JSON.parse(JSON.stringify(locale.map));  // deep copy the map

        locale.enterLocaleAt(entryPoint);

        if(rasterize) this.rasterizeLocaleMap();

        this.spawnPeople();
    }

    rasterizeLocaleMap() {
        if(!this.locale) return;
        let map = this.locale.map;
        for(let x = 0; x < this.locale.width; x++) {
            for (let y = 0; y < this.locale.height; y++) {
                let terrainType = map[x][y],
                    neighbours = {};

                if(map[x-1]) neighbours.west = map[x-1][y];
                if(map[x+1]) neighbours.east = map[x+1][y];
                if(map[x][y-1]) neighbours.north = map[x][y-1];
                if(map[x][y+1]) neighbours.south = map[x][y+1];

                let terrain = new terrains[terrainType](neighbours);
                this.localeMap[x][y] = terrain;
            }
        }
    }
}

/*
 *
 *  Paradise/Locales/Base
 *  Declan Tyson
 *  v0.0.40
 *  13/02/2018
 *
 */

class Locale {
    constructor(player, people) {
        this.player = player;
        this.people = people;
        this.entryPoints = {};
        this.spawnPoints = [];
        this.inhabitances = [];
    }

    initialise(width, height) {
        let map = [],
            enc = [],
            ent = [];
        for(let i = 0; i < width; i++) {
            map.push([]);
            enc.push([]);
            ent.push([]);
            for(let j = 0; j < height; j++) {
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

    terrainPaint(startX, startY, width, height, terrain) {
        for(let x = startX; x < startX + width; x++) {
            for(let y = startY; y < startY + height; y++) {
                this.map[x][y] = terrain;
            }
        }
    }

    randomEncounterPatch(startX, startY, width, height, rate, enemies) {
        for(let x = startX; x < startX + width; x++) {
            for (let y = startY; y < startY + height; y++) {
                this.encounters[x][y] = {
                    rate: rate,
                    enemies: enemies
                };
            }
        }
    }

    addInhabitance(startX, startY, width, height, inhabitance) {
        let doorway = inhabitance.doorway;
        this.terrainPaint(startX, startY, width, height, 'Wall');
        this.terrainPaint(doorway.x, doorway.y, 1, 1, 'Doorway');
        this.entrances[doorway.x][doorway.y] = {
            locale : inhabitance,
            entryPoint : 'frontDoor'
        };
    }

    enterLocaleAt(entryPoint) {
        this.player.stepX = 0;
        this.player.stepY = 0;
        this.player.setPlacement(this.entryPoints[entryPoint].x, this.entryPoints[entryPoint].y, true);
    }

    drawInhabitances() {
        for(let i = 0; i < this.inhabitances.length; i++) {
            let inhabitance = this.inhabitances[i];
            this.addInhabitance(inhabitance.x, inhabitance.y, inhabitance.sizeX, inhabitance.sizeY, inhabitance);
        }
    }

    assignPeopleToInhabitances() {
        if(this.inhabitances.length === 0 || this.people.length === 0) return;

        for(let i = 0; i < this.people.length; i++) {
            let person = this.people[i],
                index = Math.floor(Math.random() * this.inhabitances.length),
                inhabitance = this.inhabitances[index];

            inhabitance.addInhabitant(person);
        }
    }
}

class Interior extends Locale {
    constructor(player, people, inhabitance) {
        super(player, people);
        this.inhabitance = inhabitance;
        Util.log(`Welcome to ${inhabitance.name}.`);

        for(let i = 0; i < inhabitance.inhabitants.length; i++) {
            let inhabitant = inhabitance.inhabitants[i];
            Util.log(`${inhabitant} lives here.`);
        }
    }
}

class Inhabitance {
    constructor(id, name, x, y, doorway, sizeX = settings.defaultInhabitanceSize, sizeY = settings.defaultInhabitanceSize) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.doorway = doorway;
        this.inhabitants = [];
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    addInhabitant(person) {
        this.inhabitants.push(person);
    }
}

/*
 *
 *  Paradise/Locales/Grove Street House Template
 *  Declan Tyson
 *  v0.0.20
 *  05/02/2018
 *
 */

class GroveStreetTemplate extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.initialise(100, 100);

        this.spawnPoints.push({ x: 33, y: 35 });
        this.spawnPoints.push({ x: 39, y: 36 });
        this.spawnPoints.push({ x: 45, y: 32 });
        this.spawnPoints.push({ x: 28, y: 33 });

        this.terrainPaint(0, 0, 100, 100, 'Blank');
        this.terrainPaint(25, 25, 25, 25, 'Wall');
        this.terrainPaint(26, 26, 11, 23, 'WoodenFloor');
        this.terrainPaint(38, 26, 11, 23, 'WoodenFloor');
        this.terrainPaint(37, 37, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales/Town Hall
 *  Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

class TownHall extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'TownHall';
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[49][48] = {
            locale: new Village(player, people),
            entryPoint: 'townHall'
        };

        this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales/Village
 *  Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */
class Village extends Locale {
    constructor(player, people) {
        super(player, people);

        this.entryPoints.beginningOfGame = { x: 30, y: 30 };
        this.entryPoints.townHall = { x: 31, y: 62 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, 'Water');
        this.terrainPaint(20, 27, 15, 90, 'Grass');
        this.terrainPaint(35, 35, 2, 40, 'Grass');
        this.terrainPaint(37, 37, 2, 36, 'Grass');
        this.terrainPaint(39, 39, 2, 32, 'Grass');

        this.inhabitances.push(
            new Inhabitance('TownHall', 'Town Hall', 30, 59, { x: 31, y: 62 }, 2, 4)
        );

        this.drawInhabitances();
        this.assignPeopleToInhabitances();
    }
}

/*
 *
 *  Paradise/Locales/Islands
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

class Islands extends Locale {
    constructor(player, people) {
        super(player, people);

        this.id = 'Islands';
        this.entryPoints.beginningOfGame = { x: 57, y: 60 };
        this.entryPoints.groveStreet1 = { x: 55, y: 60 };
        this.entryPoints.groveStreet2 = { x: 58, y: 60 };
        this.entryPoints.groveStreet3 = { x: 55, y: 63 };
        this.entryPoints.groveStreet4 = { x: 58, y: 63 };
        this.entryPoints.ballManor = { x: 56, y: 74 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, 'Water');
        this.terrainPaint(52, 57, 11, 20, 'Grass');
        this.terrainPaint(42, 35, 2, 8, 'Grass');
        this.terrainPaint(57, 60, 1, 16, 'VerticalRoad');
        this.terrainPaint(55, 60, 2, 1, 'HorizontalRoad');
        this.terrainPaint(58, 60, 2, 1, 'HorizontalRoad');
        this.terrainPaint(55, 63, 2, 1, 'HorizontalRoad');
        this.terrainPaint(58, 63, 2, 1, 'HorizontalRoad');

        this.terrainPaint(55, 70, 2, 1, 'HorizontalRoad');
        this.terrainPaint(54, 70, 1, 5, 'VerticalRoad');
        this.terrainPaint(55, 74, 2, 1, 'HorizontalRoad');

        this.inhabitances.push(
            new Inhabitance('GroveStreet1', '1 Grove Street', 53, 59, { x: 54, y: 60 }),
            new Inhabitance('GroveStreet2', '2 Grove Street', 60, 59, { x: 60, y: 60 }),
            new Inhabitance('GroveStreet3', '3 Grove Street', 53, 62, { x: 54, y: 63 }),
            new Inhabitance('GroveStreet4', '4 Grove Street', 60, 62, { x: 60, y: 63 }),
            new Inhabitance('BallManor', 'Ball Manor', 55, 72, { x: 56, y: 73 })
        );

        this.drawInhabitances();
        this.assignPeopleToInhabitances();
    }
}

/*
 *
 *  Paradise/Locales/1 Grove Street
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class GroveStreet1 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'GroveStreet1';
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[49][48] = {
            locale: new Islands(player, people),
            entryPoint: 'groveStreet1'
        };

        this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales/1 Grove Street
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class GroveStreet2 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'GroveStreet2';
        this.entryPoints.frontDoor = { x: 26, y: 48 };

        this.entrances[25][48] = {
            locale: new Islands(player, people),
            entryPoint: 'groveStreet2'
        };

        this.terrainPaint(25, 48, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales/1 Grove Street
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class GroveStreet3 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'GroveStreet3';
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[49][48] = {
            locale: new Islands(player, people),
            entryPoint: 'groveStreet3'
        };

        this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales/4 Grove Street
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class GroveStreet4 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'GroveStreet4';
        this.entryPoints.frontDoor = { x: 26, y: 48 };

        this.entrances[25][48] = {
            locale: new Islands(player, people),
            entryPoint: 'groveStreet4'
        };

        this.terrainPaint(25, 48, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales/Ball Manor
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

class BallManor extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'BallManor';
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[48][49] = {
            locale: new Islands(player, people),
            entryPoint: 'ballManor'
        };

        this.terrainPaint(48, 49, 1, 1, 'WoodenFloor');
    }
}

/*
 *
 *  Paradise/Locales
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

const startingMaps = {
    'Village' : Village,
    'Islands' : Islands
};

const locales = {
    'Village' : Village,
    'Islands' : Islands,
    'GroveStreet1' : GroveStreet1,
    'GroveStreet2' : GroveStreet2,
    'GroveStreet3' : GroveStreet3,
    'GroveStreet4' : GroveStreet4,
    'BallManor' : BallManor,
    'TownHall' : TownHall
};

const chooseStartingMap = () => {
    let locale = Util.pickRandomProperty(startingMaps);
    Util.log('Choosing starting map...');
    Util.log(`Map is ${locale}.`);
    return locale;
};

/*
 *
 *  Paradise/Person
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Person {
    constructor(name, gender) {
        this.id = name;
        this.name = name;
        this.gender = gender;
        this.colour = colours.black;

        this.relationships = {};
    }

    randomizeRelationships() {
        Object.keys(this.relationships).forEach((name) => {
            let relationship = this.relationships[name],
                oldValue = relationship.value,
                newValue = Math.floor(Math.random() * 99);

            Util.log(`${this.name}'s relationship with ${posessivePronouns[this.gender]} ${relationship.description}, ${name}, goes from ${oldValue} to ${newValue}.`);
            this.relationships[name].value = newValue;
        });
    }

    addAcquaintanceRelationship(person) {
       this.relationships[person] = {
           description : 'Acquaintance',
           value: 50
       };
    }
}

/*
 *
 *  Paradise/Person/Evelyn
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */


class Evelyn extends Person {
    constructor() {
        super('Evelyn', genders.female);
    }
}

/*
 *
 *  Paradise/Person/Jill
 *  Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */


class Jill extends Person {
    constructor() {
        super('Jill', genders.female);

        this.relationships = {
            'John' : {
                description : 'Husband',
                value: 45
            }
        };
    }
}

/*
 *
 *  Paradise/Person/John
 *  Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */

class John extends Person {
    constructor() {
        super('John', genders.male);

        this.relationships = {
            'Jill' : {
                description : 'Wife',
                value: 45
            }
        };
    }
}

/*
 *
 *  Paradise/Person/Neil
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Neil extends Person {
    constructor() {
        super('Neil', genders.male);
    }
}

/*
 *
 *  Paradise/Person/Pauline
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Pauline extends Person {
    constructor() {
        super('Pauline', genders.female);
    }
}

/*
 *
 *  Paradise/Person/Petey
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Petey extends Person {
    constructor() {
        super('Petey', genders.male);
    }
}

/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Quazar extends Person {
    constructor() {
        super('Quazar', genders.alien);

        this.colour = colours.green;
        this.relationships = {
            'Zenith' : {
                description : 'Brother',
                value: 85
            }
        };
    }
}

/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

class Zenith extends Person {
    constructor() {
        super('Zenith', genders.alien);

        this.colour = colours.green;
        this.relationships = {
            'Quazar' : {
                description : 'Brother',
                value: 85
            }
        };
    }
}

/*
 *
 *  Paradise/People
 *  Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

let people = {
    'Evelyn'  : Evelyn,
    'Jill'    : Jill,
    'John'    : John,
    'Neil'    : Neil,
    'Pauline' : Pauline,
    'Petey'   : Petey,
    'Quazar'  : Quazar,
    'Zenith'  : Zenith
};

/*
 *
 *  Paradise/Game
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

const StartGame = (locale, activePeople, player, scene, renderer) => {
    clearInterval(window.drawScene);

    player = player || new Player();
    scene = scene || new WorldMap(player);
    renderer = renderer || new Renderer('world', canvasProperties.width, canvasProperties.height);

    let start = new locale(player, activePeople),
        game = new Game(renderer, scene, canvasProperties.centerPoint);

    game.locales = locales;
    game.people = people;
    game.scene.setCurrentLocale(start, 'beginningOfGame');
    game.initTerrainSprites();

    if(window.debug) {
        document.getElementById('log').style.display = 'block';
    }

    return game;
};

class Renderer {
    constructor(element, width, height) {
        this.canvas = document.getElementById(element);
        this.canvas.style.width = width;
        this.canvas.style.height = height;
        this.canvas.style.display = 'block';
        this.canvas.width = width;
        this.canvas.height = height;
        this.fps = settings.fps;
        this.ctx = this.canvas.getContext('2d');
    }
}

class Game {
    constructor(renderer, scene, centerPoint) {
        this.actionTimeout = settings.actionTimeoutLimit;
        this.renderer = renderer;
        this.setScene(scene);
        this.centerPoint = centerPoint;
        this.currentAction = null;
        this.terrainSprites = {};
        this.redraw = true;
        this.spritesLoaded = 0;
        this.loading = true;

        this.draw();
    }

    initTerrainSprites() {
        let locale = this.scene.locale,
            localeMap = this.scene.localeMap;

        for(let x = 0; x < locale.width; x++) {
            for (let y = 0; y < locale.height; y++) {
                let terrain = localeMap[x][y];
                if(terrain.image && !this.terrainSprites[terrain.image]) {
                    /* jshint ignore:start */
                    let tile = new Image();
                    tile.src = terrain.image;
                    this.terrainSprites[localeMap[x][y].image] = tile;

                    tile.onload = () => {
                        this.spritesLoaded++;
                        if(this.spritesLoaded >= Object.keys(this.terrainSprites).length) {
                            this.loading = false;
                        }
                    };
                    tile.onerror = () => {
                        tile.src = terrain.fallbackImage;
                    };
                    /* jshint ignore:end */
                }
            }
        }
    }

    draw() {
        let pre_canvas = document.createElement('canvas'),
            pre_ctx = pre_canvas.getContext('2d');
        pre_canvas.height = this.renderer.canvas.height;
        pre_canvas.width = this.renderer.canvas.width;

        this.renderer.ctx.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

        this.scene.doActions(this.currentAction);
        this.scene.draw(pre_ctx);

        if(this.loading) {
            let loading = new Image();
            loading.src = '/oob/loading.png';
            this.cachedCanvas = loading;
        } else if(this.redraw) {
            this.cachedCanvas = pre_canvas;
        }
        this.renderer.ctx.drawImage(this.cachedCanvas, 0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

        window.requestAnimationFrame(this.draw.bind(this));
    }

    setScene(scene) {
        this.scene = scene;
        this.scene.setGame(this);
    }

    sendInput(input) {
        this.currentAction = input;
    }

    triggerActionTimeout() {
        this.actionTimeoutCounterInterval = setInterval(this.actionTimeoutCounter.bind(this), 1000 / this.renderer.fps);
    }

    actionTimeoutCounter() {
        this.actionTimeout--;
        if(this.actionTimeout === 0) {
            clearInterval(this.actionTimeoutCounterInterval);
            this.actionTimeout = settings.actionTimeoutLimit;
        }
    }
}

/*
 *
 *  Paradise/People
 *  Declan Tyson
 *  v0.0.37
 *  12/02/2018
 *
 */

const choosePeople = () => {
    let chosenPeople = [];
    Util.log(`Choosing ${settings.personCount} people...`);
    let person;
    while(chosenPeople.length < settings.personCount) {
        person = Util.pickRandomProperty(people);
        if(chosenPeople.indexOf(person) === -1) {
            chosenPeople.push(person);
            Util.log(`${person} has been chosen.`);
        }
    }

    return chosenPeople;
};

/*
 *
 *  Paradise
 *  Declan Tyson
 *  v0.0.33
 *  09/02/2018
 *
 */
// Engine

exports.StartGame = StartGame;
exports.Interaction = Interaction;
exports.Item = Item;
exports.Locale = Locale;
exports.Inhabitance = Inhabitance;
exports.Interior = Interior;
exports.Player = Player;
exports.choosePeople = choosePeople;
exports.Person = Person;
exports.Scene = Scene;
exports.terrains = terrains;
exports.Util = Util;
exports.WorldMap = WorldMap;
exports.startingMaps = startingMaps;
exports.chooseStartingMap = chooseStartingMap;
exports.people = people;
exports.Evelyn = Evelyn;
exports.Jill = Jill;
exports.John = John;
exports.Neil = Neil;
exports.Pauline = Pauline;
exports.Petey = Petey;
exports.Quazar = Quazar;
exports.Zenith = Zenith;

return exports;

}({}));
