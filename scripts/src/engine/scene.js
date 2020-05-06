/*
 *
 *  Paradise/Scene
 *  Declan Tyson
 *  v0.0.91
 *  21/10/2019
 *
 */

class Scene {
  constructor() {
    this.actions = {
      up: this.empty,
      down: this.empty,
      left: this.empty,
      right: this.empty,
      action: this.empty,
      back: this.empty,
    };
    this.keyHeld = false;
  }

  empty() {
    return null;
  }

  doActions(action) {
    if (!this.game || this.game.loading || !action || !this.actions[action]) return;
    this.game.triggerActionTimeout();

    this.actions[action]();
  }

  draw(ctx) {}

  setGame(game) {
    this.game = game;
  }

  onLoad() {
    console.log('ballsacks');
    // extend this function
  }
}

export { Scene };
