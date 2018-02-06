/*
 *
 *  XL RPG/Scene
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import { actionTimeoutLimit } from "../constants";

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

export { Scene };