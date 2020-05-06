/*
 *
 *  Paradise/Scene-Encounter
 *  Declan Tyson
 *  v0.0.95
 *  06/05/2020
 *
 */

import { Scene } from './scene';
import { colours } from '../constants';
import { settings } from '../settings';
import { enemies } from '../enemies/enemies';

class Encounter extends Scene {
  constructor(enemyGroupOptions) {
    super();

    this.enemyGroupOptions = enemyGroupOptions;
    this.enemies = [];

    this.chooseEnemyGroup();
  }

  chooseEnemyGroup() {
    let numOptions = this.enemyGroupOptions.length;
    if (numOptions > 1) {
      this.setEnemies(Math.floor(Math.random() * numOptions));
    } else {
      this.setEnemies(0);
    }
  }

  setEnemies(enemyGroupIndex) {
    this.enemyGroupOptions[enemyGroupIndex].forEach(enemy => {
      this.enemies.push(new enemies[enemy]());
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
