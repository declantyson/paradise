/*
 *
 *  XL RPG/Scene-WorldMap
 *  XL Gaming/Declan Tyson
 *  v0.0.14
 *  15/11/2017
 *
 */

import * as util from '../util';

import { colours, tileSize, tilesWide as viewportWidth, tilesHigh as viewportHeight } from "../constants";
import { Scene } from "./scene";
import { locales } from '../locales/availablelocales';

class WorldMap extends Scene {
    constructor(player) {
        super();
        this.player = player;

        this.actions.up = this.moveUp.bind(this);
        this.actions.down = this.moveDown.bind(this);
        this.actions.left = this.moveLeft.bind(this);
        this.actions.right = this.moveRight.bind(this);
    }

    doActions(action) {
        super.doActions(action);

        if(!action) return;
        this.checkForRandomEncounters();
        this.checkForEntrance();
    }

    moveUp() {
        if(this.localeMap[this.player.x][this.player.y - 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y - 1);
    }

    moveDown() {
        if(this.localeMap[this.player.x][this.player.y + 1].isPassable()) this.player.setPlacement(this.player.x, this.player.y + 1);
    }

    moveLeft() {
        if(this.localeMap[this.player.x - 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x - 1, this.player.y);
    }

    moveRight() {
        if(this.localeMap[this.player.x + 1][this.player.y].isPassable()) this.player.setPlacement(this.player.x + 1, this.player.y);
    }

    draw(ctx) {
        this.drawLocale(ctx);
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        // Player is always at center of screen

        ctx.beginPath();
        ctx.rect(this.game.centerPoint.x, this.game.centerPoint.y, tileSize, tileSize);
        ctx.fillStyle = colours.black;
        ctx.fill();
    }

    drawLocale(ctx) {
        if(!this.locale) return;
        let offsetX = this.player.x * tileSize - this.game.centerPoint.x,
            offsetY = this.player.y * tileSize - this.game.centerPoint.y,
            viewportStartX = this.player.x - (viewportWidth / 2),
            viewportStartY = this.player.y - (viewportHeight / 2);

        if(viewportStartX < 0) viewportStartX = 0;
        if(viewportStartY < 0) viewportStartY = 0;
        if(viewportStartX >= this.locale.width) viewportStartX = this.locale.width;
        if(viewportStartY >= this.locale.height) viewportStartY = this.locale.height;

        for(let x = viewportStartX; x <= viewportStartX + viewportWidth; x++) {
            for(let y = viewportStartY; y <= viewportStartY + viewportHeight; y++) {
                let terrain = this.localeMap[x][y];
                ctx.beginPath();
                ctx.fillStyle = terrain.colour;
                ctx.strokeStyle = terrain.colour;
                ctx.rect(x * tileSize - offsetX, y * tileSize - offsetY, tileSize, tileSize);
                ctx.fill();
                ctx.stroke();
            }
        }
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

    checkForEntrance() {
        let entrance = this.locale.entrances[this.player.x][this.player.y];
        if(!entrance) return;

        this.enter(entrance);
    }

    enter(entrance) {
        let locale = locales[entrance.locale.id];
        this.setCurrentLocale(new locale(this.locale.player, this.locale.people, entrance.locale), entrance.entryPoint);
    }

    setCurrentLocale(locale, entryPoint) {
        this.locale = locale;
        this.localeMap = locale.map;

        this.rasterizeLocaleMap();
        locale.enterLocaleAt(entryPoint);
    }

    rasterizeLocaleMap() {
        if(!this.locale) return;

        for(let x = 0; x < this.locale.width; x++) {
            for (let y = 0; y < this.locale.height; y++) {
                let terrainType = this.locale.map[x][y];
                this.localeMap[x][y] = new window.terrains[terrainType]();
            }
        }
    }
}

export { WorldMap };
