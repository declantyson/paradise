/*
 *
 *  XL RPG/Scene-WorldMap
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
 *
 */

import { colours, tileSize, tilesWide as viewportWidth, tilesHigh as viewportHeight } from "../constants";
import { Grass, Water } from "../terrain";
import { Scene } from "./scene";
import { Encounter } from "./encounter";

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
        console.log(chance);
        if(chance === potentialRandomEncounter.rate) {
            this.startRandomEncounter(potentialRandomEncounter.enemies);
        }
    }

    startRandomEncounter(enemies) {
        this.game.setScene(new Encounter(enemies));
    }

    setCurrentLocale(locale) {
        this.locale = locale;
        this.localeMap = locale.map;

        this.rasterizeLocaleMap();
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