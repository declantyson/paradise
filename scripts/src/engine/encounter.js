/*
 *
 *  Paradise/Scene-Encounter
 *  Declan Tyson
 *  v0.0.92
 *  21/10/2019
 *
 */

import { Scene } from './scene';
import { colours } from '../constants';
import { settings } from '../settings';
import '../enemies/enemydirectory';

class Encounter extends Scene {
  constructor(enemies) {
    super();

    this.enemies = [];
    let self = this;
    enemies.forEach(enemy => {
      self.enemies.push(new window.enemies[enemy]());
    });
  }

  draw(ctx) {
    const canvasProperties = settings.canvasProperties();
    ctx.strokeStyle = colours.black;
    ctx.rect(0, 0, canvasProperties.width, canvasProperties.height);
    ctx.fill();
  }
}

export { Encounter };
