/*
 *
 *  XL RPG/Scene-WorldMap
 *  XL Gaming/Declan Tyson
 *  v0.0.27
 *  07/02/2018
 *
 */

import * as terrain from './terrain';
import { colours, tileSize, tilesWide as viewportWidth, tilesHigh as viewportHeight, directions } from '../constants';
import { Scene } from './scene';
import { Interaction } from './interaction';
import { locales } from '../locales/locales';
import { people } from '../people/people';

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

        if(!action) return;
        this.checkForRandomEncounters();
        this.checkForEntrance();
    }

    moveUp() {
        if(this.localeMap[this.player.x][this.player.y - 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y - 1);
        this.player.direction = directions.up;
    }

    moveDown() {
        if(this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
        this.player.direction = directions.down;
    }

    moveLeft() {
        if(this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
        this.player.direction = directions.left;
    }

    moveRight() {
        if(this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
        this.player.direction = directions.right;
    }

    draw(ctx) {
        this.offsetX = this.player.x * tileSize - this.game.centerPoint.x;
        this.offsetY = this.player.y * tileSize - this.game.centerPoint.y;
        this.viewportStartX = this.player.x - (viewportWidth / 2);
        this.viewportStartY = this.player.y - (viewportHeight / 2);

        this.drawLocale(ctx);
        this.drawPlayer(ctx);
        this.drawPeople(ctx);
    }

    drawPlayer(ctx) {
        // Player is always at center of screen

        ctx.beginPath();
        ctx.rect(this.game.centerPoint.x, this.game.centerPoint.y, tileSize, tileSize);
        ctx.fillStyle = this.player.colour;
        ctx.fill();
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
                    tileY = y * tileSize - this.offsetY;

                if(!terrain.image) {
                    ctx.beginPath();
                    ctx.fillStyle = terrain.colour;
                    ctx.strokeStyle = terrain.colour;
                    ctx.rect(tileX, tileY, tileSize, tileSize);
                    ctx.fill();
                    ctx.stroke();
                } else {
                    let tile = window.game.terrainSprites[terrain.id];
                    ctx.drawImage(tile, tileX, tileY, tileSize, tileSize);
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
            this.setCurrentLocale(this.visitedLocales[entrance.locale.id], entrance.entryPoint, false);
            return;
        }

        let localeId = locales[entrance.locale.id],
            locale = new localeId(this.locale.player, this.locale.people, entrance.locale);

        this.setCurrentLocale(locale, entrance.entryPoint);
    }

    spawnPeople() {
        if(this.locale.inhabitance === undefined) return;

        this.locale.inhabitance.inhabitants.forEach((inhabitant, index) => {
            let spawnPoint = this.locale.spawnPoints[index];
            if(spawnPoint !== undefined) {
                let person = new people[inhabitant]();
                person.x = spawnPoint.x;
                person.y = spawnPoint.y;
                this.presentPeople.push(person);
            }
        });
    }

    setCurrentLocale(locale, entryPoint, rasterize = true) {
        this.visitedLocales[locale.id] = locale;

        this.locale = locale;
        this.localeMap = locale.map;
        locale.enterLocaleAt(entryPoint);

        if(rasterize) this.rasterizeLocaleMap();

        this.spawnPeople();
    }

    rasterizeLocaleMap() {
        if(!this.locale) return;

        for(let x = 0; x < this.locale.width; x++) {
            for (let y = 0; y < this.locale.height; y++) {
                let terrainType = this.locale.map[x][y];

                this.localeMap[x][y] = new terrain[terrainType]();
            }
        }
    }
}

export { WorldMap };
