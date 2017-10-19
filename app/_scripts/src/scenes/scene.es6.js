/*
 *
 *  XL RPG/Scene
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
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
            action: this.empty
        };
    }

    empty() {
        return null;
    }

    doActions(action) {
        if(!this.game || this.game.actionTimeout < actionTimeoutLimit || !action) return;
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