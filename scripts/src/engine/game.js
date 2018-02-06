/*
 *
 *  XL RPG/Game
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import * as util from './util';
import * as input from './inputs';

import { Player } from './player';
import { WorldMap } from './worldmap';
import { tileSize, canvasProperties, fps, actionTimeoutLimit } from './constants';

export const StartGame = (locale, people) => {
    clearInterval(window.drawScene);

    let player = new Player(),
        scene = new WorldMap(player),
        start = new locale(player, people),
        renderer = new Renderer('world', canvasProperties.width, canvasProperties.height),
        game = new Game(renderer, scene, canvasProperties.centerPoint);

    game.scene.setCurrentLocale(start, 'beginningOfGame');

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

        this.draw();
    }

    draw() {
        let pre_canvas = document.createElement('canvas'),
            pre_ctx = pre_canvas.getContext('2d');
        pre_canvas.height = this.renderer.canvas.height;
        pre_canvas.width = this.renderer.canvas.width;

        this.renderer.ctx.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

        this.scene.doActions(this.currentAction);
        this.scene.draw(pre_ctx);

        this.renderer.ctx.drawImage(pre_canvas, 0, 0);

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
