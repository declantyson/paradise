/*
 *
 *  Paradise/Scene-Interaction
 *  Declan Tyson
 *  v0.0.67
 *  27/04/2018
 *
 */

import { Util } from './util';

import { Scene } from './scene';
import { colours } from '../constants';
import { settings, canvasProperties } from '../settings';

class Interaction extends Scene {
  constructor(person) {
    super();

    this.person = person;

    // calculate these values based on mood etc....;
    this.lines = this.person.lines || [];
    this.conversationOptions = this.person.conversationOptions || [];

    this.selectedConversationOption = 0;

    this.exiting = false;

    this.actions.up = this.previousOption.bind(this);
    this.actions.down = this.nextOption.bind(this);
    this.actions.action = this.sendResponse.bind(this);
    // this.actions.back = this.returnToWorldMap.bind(this);

    Util.log(`Entering interaction with ${this.person.name}`);
  }

  draw(ctx) {
    // World map should be overlaid
    this.worldMap.draw(ctx);
    this.person.currentPortrait.draw(ctx);

    if (this.exiting && !this.person.currentPortrait.exiting) {
      this.exit();
    }

    if (!this.game.keyHeld) this.keyHeld = false;

    this.drawConversationTextArea(ctx);
    this.drawBadge(ctx);
    this.drawConversation(ctx);
    this.drawOptions(ctx);
  }

  drawConversationTextArea(ctx) {
    ctx.rect(
      settings.interactionTextArea.x,
      settings.interactionTextArea.y,
      settings.interactionTextArea.width,
      settings.interactionTextArea.height
    );
    ctx.fillStyle = settings.interactionTextArea.background;
    ctx.globalAlpha = settings.interactionTextArea.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  drawBadge(ctx) {
    ctx.font = settings.fonts.large;
    ctx.fillStyle = colours.white;
    ctx.fillText(
      this.person.name,
      settings.interactionTextArea.badgeOffsetX,
      canvasProperties.height - settings.interactionTextArea.height + settings.interactionTextArea.badgeOffsetY
    );
  }

  drawConversation(ctx) {
    let y = canvasProperties.height - settings.interactionTextArea.height + settings.interactionTextArea.badgeOffsetY * 2;
    ctx.font = settings.fonts.small;
    ctx.fillStyle = colours.white;
    let lines = [];
    this.lines.forEach(line => {
      if (line.length < 60) lines.push(line);
      else {
        let chunks = line.split(/( )/),
          chunkedLine = '';
        chunks.forEach(chunk => {
          if (chunkedLine.length + chunk.length > 60) {
            lines.push(chunkedLine);
            chunkedLine = '';
          }
          chunkedLine += chunk;
        });
        lines.push(chunkedLine);
      }
    });

    lines.forEach((line, index) => {
      ctx.fillText(line, settings.interactionTextArea.badgeOffsetX, y + index * settings.interactionTextArea.lineHeight);
    });

    this.chunkedLines = lines;
  }

  drawOptions(ctx) {
    let y =
      canvasProperties.height -
      settings.interactionTextArea.height +
      settings.interactionTextArea.optionsOffsetY +
      this.chunkedLines.length * settings.interactionTextArea.lineHeight;
    ctx.font = settings.fonts.small;
    ctx.fillStyle = colours.white;
    this.conversationOptions.forEach((conversationOption, index) => {
      ctx.fillText(
        conversationOption.value,
        settings.interactionTextArea.optionsOffsetX,
        y + index * settings.interactionTextArea.optionHeight
      );
      if (index === this.selectedConversationOption) {
        ctx.strokeStyle = colours.white;
        ctx.strokeRect(
          settings.interactionTextArea.optionsOffsetX - settings.interactionTextArea.optionHeight / 2,
          y + index * settings.interactionTextArea.optionHeight - settings.interactionTextArea.optionHeight / 1.5,
          settings.interactionTextArea.width - settings.interactionTextArea.optionsOffsetX,
          settings.interactionTextArea.optionHeight
        );
      }
    });
  }

  nextOption() {
    if (this.keyHeld) return;

    if (this.selectedConversationOption < this.conversationOptions.length - 1) this.selectedConversationOption++;
    this.keyHeld = true;
  }

  previousOption() {
    if (this.keyHeld) return;

    if (this.selectedConversationOption > 0) this.selectedConversationOption--;
    this.keyHeld = true;
  }

  sendResponse() {
    if (this.keyHeld || this.person.currentPortrait.entering || this.person.currentPortrait.exiting) return;

    this.person.sendResponse(this.conversationOptions[this.selectedConversationOption], this);
    this.keyHeld = true;
  }

  returnToWorldMap() {
    if (!this.worldMap) return;
    this.exiting = true;
    this.person.currentPortrait.exiting = true;
    this.conversationOptions = [];
  }

  exit() {
    this.game.setScene(this.worldMap);
  }
}

export { Interaction };
