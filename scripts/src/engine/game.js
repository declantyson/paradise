/*
 *
 *  XL RPG/Game
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  06/02/2018
 *
 */

import * as input from './inputs';
import { Player } from './player';
import { WorldMap } from './worldmap';
import { tileSize, canvasProperties, fps, actionTimeoutLimit } from './constants';
import { chooseStartingMap } from './locales';
import { startingMaps } from '../locales/availablelocales';
import { choosePeople } from './people';
import { chooseVictim, chooseMurderer } from '../people/availablepeople';

export const StartGame = (locale, people, victim, murderer) => {
    clearInterval(window.drawScene);

    locale = startingMaps[locale] || startingMaps[chooseStartingMap()];
    people = people || choosePeople();
    victim = victim || chooseVictim(people);
    murderer = murderer || chooseMurderer(victim, people);

    let player = new Player(),
        scene = new WorldMap(player),
        start = new locale(player, people),
        renderer = new Renderer('world', canvasProperties.width, canvasProperties.height);

    window.game = new Game(renderer, scene, canvasProperties.centerPoint);
    window.game.scene.setCurrentLocale(start, 'beginningOfGame');
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

        window.drawScene = setInterval(this.draw.bind(this), 1000 / this.renderer.fps);
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
