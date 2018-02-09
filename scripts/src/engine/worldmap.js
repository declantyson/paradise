/*
 *
 *  Paradise/Scene-WorldMap
 *  Declan Tyson
 *  v0.0.31
 *  08/02/2018
 *
 */

import { terrains } from './terrains';
import { spriteSize, tileSize, tilesWide as viewportWidth, tilesHigh as viewportHeight, directions } from '../constants';
import { Scene } from './scene';
import { Interaction } from './interaction';

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
            this.offsetX === this.player.x * tileSize - this.game.centerPoint.x &&
            this.offsetY === this.player.y * tileSize - this.game.centerPoint.y
        ) {
            this.game.redraw = false;
            return;
        }*/

        this.game.redraw = true;

        this.offsetX = this.player.x * tileSize - this.game.centerPoint.x;
        this.offsetY = this.player.y * tileSize - this.game.centerPoint.y;
        this.viewportStartX = this.player.x - (viewportWidth / 2);
        this.viewportStartY = this.player.y - (viewportHeight / 2);

        this.drawLocale(ctx);
        this.drawPeople(ctx);
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        // Player is always at center of screen
        let sprite = this.player.sprite;
        ctx.drawImage(sprite.image, sprite.x, sprite.y, 64, 64, this.game.centerPoint.x - (tileSize/2), this.game.centerPoint.y - tileSize, spriteSize, spriteSize);

        /*ctx.beginPath();
        ctx.rect(this.game.centerPoint.x, this.game.centerPoint.y, tileSize, tileSize);
        ctx.fillStyle = this.player.colour;
        ctx.fill();*/
    }

    drawLocale(ctx) {
        if(!this.locale) return;

        let viewportStartX = this.viewportStartX,
            viewportStartY = this.viewportStartY;

        if(viewportStartX < 0) viewportStartX = 0;
        if(viewportStartY < 0) viewportStartY = 0;
        if(viewportStartX >= this.locale.width) viewportStartX = this.locale.width;
        if(viewportStartY >= this.locale.height) viewportStartY = this.locale.height;

        for(let x = viewportStartX; x <= viewportStartX + viewportWidth; x++) {
            for(let y = viewportStartY; y <= viewportStartY + viewportHeight; y++) {

                let terrain = this.localeMap[x][y],
                    tileX = x * tileSize - this.offsetX,
                    tileY = y * tileSize - this.offsetY,
                    tile = window.game.terrainSprites[terrain.image];

                if(!tile) {
                    ctx.beginPath();
                    ctx.fillStyle = terrain.colour;
                    ctx.strokeStyle = terrain.colour;
                    ctx.rect(tileX, tileY, tileSize, tileSize);
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.strokeStyle = null;
                    ctx.drawImage(tile, 0, 0, 45, 45, tileX, tileY, tileSize, tileSize);
                }
            }
        }
    }

    drawPeople(ctx) {
        if(this.presentPeople.length === 0) return;

        this.presentPeople.forEach((person) => {
            ctx.beginPath();
            ctx.rect(person.x * tileSize - this.offsetX, person.y * tileSize - this.offsetY, tileSize, tileSize);
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
                console.log(window.game.people);
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

export { WorldMap };
