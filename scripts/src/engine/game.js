/*
 *
 *  Paradise/Game
 *  Declan Tyson
 *  v0.0.44
 *  13/02/2018
 *
 */

import * as input from './inputs';

import { Item } from './item';
import { Player } from './player';
import { WorldMap } from './worldmap';
import { locales } from '../locales/locales';
import { people } from '../people/people';
import { settings, canvasProperties } from '../settings';


export const StartGame = (locale, activePeople, player, scene, renderer) => {
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
        this.keyHeld = input;
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
