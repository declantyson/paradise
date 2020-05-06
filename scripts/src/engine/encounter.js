/*
 *
 *  Paradise/Scene-Encounter
 *  Declan Tyson
 *  v0.0.97
 *  06/05/2020
 *
 */

import { Scene } from './scene';
import { colours } from '../constants';
import { settings } from '../settings';
import { enemies } from '../enemies/enemies';

class Encounter extends Scene {
  constructor(worldMap, enemyGroupOptions, scenery) {
    super();

    this.worldMap = worldMap;
    this.enemyGroupOptions = enemyGroupOptions;
    this.enemies = [];
    this.party = window.game.currentParty;
    this.actions.back = this.exit.bind(this);

    let background = new Image();
    background.src = scenery;
    this.scenery = background;

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

    ctx.drawImage(this.scenery, 0, 0, canvasProperties.width, canvasProperties.height);

    this.drawParty(ctx);
    this.drawEnemies(ctx);
  }

  drawParty(ctx) {
    const canvasProperties = settings.canvasProperties();
    const encounterSettings = settings.get('encounter');

    let startX =
      canvasProperties.width / 4 - encounterSettings.spriteSize - encounterSettings.spriteSpacing;
    let startY = canvasProperties.height / 2;

    this.party.forEach(member => {
      ctx.drawImage(
        member.sprite,
        startX,
        startY,
        encounterSettings.spriteSize,
        encounterSettings.spriteSize
      );

      startX += encounterSettings.spriteSpacing + encounterSettings.spriteSize;
      startY += encounterSettings.spriteSpacing;
    });
  }

  drawEnemies(ctx) {
    const canvasProperties = settings.canvasProperties();
    // TODO: Have multiple settings for the enemies
    const encounterSettings = settings.get('encounter');

    let spaceOfEnemies =
      (encounterSettings.spriteSize + encounterSettings.spriteSpacing) * this.enemies.length -
      encounterSettings.spriteSpacing;

    let startX = canvasProperties.width / 2 + (canvasProperties.width / 4 - spaceOfEnemies / 2);
    let startY = canvasProperties.height / 2;

    this.enemies.forEach(enemy => {
      ctx.drawImage(
        enemy.sprite,
        startX,
        startY,
        encounterSettings.spriteSize,
        encounterSettings.spriteSize
      );

      startX += encounterSettings.spriteSpacing + encounterSettings.spriteSize;
      startY += encounterSettings.spriteSpacing;
    });
  }

  exit() {
    this.game.setScene(this.worldMap);
  }
}

export { Encounter };
