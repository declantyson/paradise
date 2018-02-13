/*
 *
 *  Paradise/Scene
 *  Declan Tyson
 *  v0.0.44
 *  13/02/2018
 *
 */

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
        this.keyHeld = false;
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