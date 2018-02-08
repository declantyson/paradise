/*
 *
 *  XL RPG/Game
 *  XL Gaming/Declan Tyson
 *  v0.0.29
 *  08/02/2018
 *
 */

import * as util from './util';
import * as input from './inputs';

import { Player } from './player';
import { WorldMap } from './worldmap';
import { canvasProperties, fps, actionTimeoutLimit } from '../constants';
import { terrains } from './terrains';

export const StartGame = (locale, people, player, scene, renderer) => {
    clearInterval(window.drawScene);

    player = player || new Player();
    scene = scene || new WorldMap(player);
    renderer = renderer || new Renderer('world', canvasProperties.width, canvasProperties.height);

    let start = new locale(player, people),
        game = new Game(renderer, scene, canvasProperties.centerPoint);

    game.scene.setCurrentLocale(start, 'beginningOfGame');
    game.initTerrainSprites();

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
        this.fps = fps;
        this.ctx = this.canvas.getContext('2d');
    }
}

class Game {
    constructor(renderer, scene, centerPoint) {
        this.actionTimeout = actionTimeoutLimit;
        this.renderer = renderer;
        this.setScene(scene);
        this.centerPoint = centerPoint;
        this.currentAction = null;
        this.terrainSprites = {};
        this.redraw = true;

        this.draw();
    }

    initTerrainSprites() {
        let locale = this.scene.locale,
            localeMap = this.scene.localeMap;

        console.log(this.scene);

        for(let x = 0; x < locale.width; x++) {
            for (let y = 0; y < locale.height; y++) {
                let terrain = localeMap[x][y];
                if(terrain.image && !this.terrainSprites[terrain.image]) {
                    let tile = new Image();
                    tile.src = terrain.image;
                    this.terrainSprites[localeMap[x][y].image] = tile;
                }
            }
        }

        console.log(this.terrainSprites);
    }

    draw() {
        let pre_canvas = document.createElement('canvas'),
            pre_ctx = pre_canvas.getContext('2d');
        pre_canvas.height = this.renderer.canvas.height;
        pre_canvas.width = this.renderer.canvas.width;

        this.renderer.ctx.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

        this.scene.doActions(this.currentAction);
        this.scene.draw(pre_ctx);

        if(this.redraw) {
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
            this.actionTimeout = actionTimeoutLimit;
        }
    }
}
