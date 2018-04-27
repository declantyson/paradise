/*
 *
 *  Paradise/Scene-ObjectInteraction
 *  Declan Tyson
 *  v0.0.65
 *  26/02/2018
 *
 */

import { Scene } from './scene';
import { colours } from '../constants';
import { settings, canvasProperties } from '../settings';

class ObjectInteraction extends Scene {
  constructor(decoration) {
    super();

    this.decoration = decoration;

    // calculate these values based on mood etc....;
    this.lines = this.decoration.lines || [];
    this.conversationOptions = this.decoration.conversationOptions || [];

    this.selectedConversationOption = 0;

    this.keyHeld = true;
    this.exiting = false;

    this.actions.up = this.previousOption.bind(this);
    this.actions.down = this.nextOption.bind(this);
    this.actions.action = this.sendResponse.bind(this);
  }

  draw(ctx) {
    // World map should be overlaid
    this.worldMap.draw(ctx);

    if (!this.game.keyHeld) this.keyHeld = false;

    this.drawConversationTextArea(ctx);
    this.drawConversation(ctx);
    this.drawOptions(ctx);
  }

  drawConversationTextArea(ctx) {
    ctx.rect(
      0,
      canvasProperties.height - settings.interactionTextArea.height,
      settings.interactionTextArea.width,
      settings.interactionTextArea.height
    );
    ctx.fillStyle = settings.interactionTextArea.background;
    ctx.globalAlpha = settings.interactionTextArea.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  drawConversation(ctx) {
    let y = canvasProperties.height - settings.interactionTextArea.height + settings.interactionTextArea.badgeOffsetY;
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
      settings.interactionTextArea.optionsOffsetY -
      settings.interactionTextArea.badgeOffsetY +
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
    if (this.keyHeld) return;

    this.decoration.sendResponse(this.conversationOptions[this.selectedConversationOption], this);
    this.keyHeld = true;
  }

  returnToWorldMap() {
    this.worldMap.leavingInteraction = true;
    setTimeout(() => {
      this.worldMap.leavingInteraction = false;
    }, 250);
    this.game.setScene(this.worldMap);
  }
}

export { ObjectInteraction };
