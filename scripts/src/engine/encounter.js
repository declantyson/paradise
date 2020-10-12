/*
 *
 *  Paradise/Scene-Encounter
 *  Declan Tyson
 *  v0.0.99
 *  06/05/2020
 *
 */

import { Scene } from './scene';
import { settings } from '../settings';
import { enemies } from '../enemies/enemies';
import { colours, actorType } from '../constants';

class Encounter extends Scene {
  constructor(worldMap, enemyGroupOptions, scenery) {
    super();

    this.worldMap = worldMap;
    this.enemyGroupOptions = enemyGroupOptions;
    this.enemies = [];
    this.party = window.game.currentParty;
    this.actions.back = this.exit.bind(this);
    this.turnMeters = [];
    this.fullMeterValue = 100;
    this.currentTurn = null;
    this.options = [];
    this.selectedOption = null;

    let background = new Image();
    background.src = scenery;
    this.scenery = background;

    this.chooseEnemyGroup();
    this.initializeTurnMeters();
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

  initializeTurnMeters() {
    let topSpeed = 1;
    this.party.forEach(member => {
      if (member.speed > topSpeed) topSpeed = member.speed;
      this.turnMeters.push({
        actor: member,
        fill: 0,
        actorType: actorType.party
      });
    });

    this.enemies.forEach(enemy => {
      if (enemy.speed > topSpeed) topSpeed = enemy.speed;
      this.turnMeters.push({
        actor: enemy,
        fill: 0,
        actorType: actorType.enemy
      });
    });

    this.fullMeterValue *= topSpeed;
  }

  incrementTurnMeters() {
    if (this.currentTurn) return;

    this.turnMeters.forEach(turnMeter => {
      if (this.currentTurn) return;

      turnMeter.fill += turnMeter.actor.speed;
      if (turnMeter.fill > this.fullMeterValue) {
        turnMeter.fill = this.fullMeterValue;
        this.currentTurn = turnMeter;
        this.options = turnMeter.actor.actions;
      }
    });
  }

  draw(ctx) {
    const canvasProperties = settings.canvasProperties();

    ctx.drawImage(this.scenery, 0, 0, canvasProperties.width, canvasProperties.height);

    this.drawParty(ctx);
    this.drawEnemies(ctx);
    this.drawEncounterTextArea(ctx);

    this.incrementTurnMeters();

    this.drawTurnMeters(ctx);
  }

  drawEncounterTextArea(ctx) {
    const encounterTextArea = settings.get('encounterTextArea');
    const fonts = settings.get('fonts');

    ctx.rect(
      encounterTextArea.x,
      encounterTextArea.y,
      encounterTextArea.width,
      encounterTextArea.height
    );
    ctx.fillStyle = encounterTextArea.background;
    ctx.globalAlpha = encounterTextArea.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;

    if(this.currentTurn) {
        if(this.currentTurn.actorType === actorType.party) {
            ctx.font = fonts.small;
            ctx.fillStyle = colours.white;
            ctx.fillText(
                this.currentTurn.actor.name,
                encounterTextArea.x + encounterTextArea.optionsOffsetX,
                encounterTextArea.y + encounterTextArea.optionHeight
            );
            this.drawActionOptions(ctx);
        }
    }
  }

  drawActionOptions(ctx) {
    this.options.forEach(option => {

    })
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

  drawTurnMeters(ctx) {
      const canvasProperties = settings.get('canvasProperties');
      const encounterTextArea = settings.get('encounterTextArea');
      const fonts = settings.get('fonts');

      let startX = canvasProperties.width / 2 + encounterTextArea.optionsOffsetX;
      let startY = encounterTextArea.y + encounterTextArea.optionsOffsetY;

      this.turnMeters.forEach(turnMeter => {
          ctx.font = fonts.small;
          ctx.fillStyle = colours.white;
          ctx.fillText(
              turnMeter.actor.name,
              startX,
              startY
          );

          ctx.fillStyle = colours.green;
          ctx.fillRect(
            startX + encounterTextArea.lineLength,
            startY - encounterTextArea.lineHeight / 2,
            (turnMeter.fill / this.fullMeterValue) * 100,
            encounterTextArea.lineHeight / 2
          );
          ctx.strokeStyle = colours.white;
          ctx.strokeRect(
              startX + encounterTextArea.lineLength - 1,
              startY - encounterTextArea.lineHeight / 2 - 1,
              102,
              encounterTextArea.lineHeight / 2 + 2
          );

          startY += encounterTextArea.lineHeight;
      });
  }

  exit() {
    this.game.setScene(this.worldMap);
  }
}

export { Encounter };
