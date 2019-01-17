/*
 *
 *  Paradise/Decorative
 *  Declan Tyson
 *  v0.0.80
 *  17/01/2019
 *
 */

import { colours } from '../constants';
import { settings, tileStep } from '../settings';
import { ObjectInteraction } from './objectinteraction';
import { Util } from './util';

class Decorative {
  constructor(name, description, src, x, y, passMap = [false], canWalkBehind = true) {
    this.name = name;
    this.description = description;
    let image = new Image();
    image.src = src;
    this.image = image;
    this.items = [];
    this.colour = colours.red;
    this.passMap = passMap;
    this.canWalkBehind = canWalkBehind;

    this.lines = [];
    this.conversationOptions = [];
    this.responses = {};

    this.x = x;
    this.y = y;
  }

  updateImage(src) {
    let image = new Image();
    image.src = src;
    this.image = image;
  }

  addItem(item) {
    this.items.push(item);
  }

  draw(ctx, player, mapOffsetX, mapOffsetY, map) {
    let decorationX = this.x * settings.terrain.tileSize - mapOffsetX,
      decorationY = this.y * settings.terrain.tileSize - mapOffsetY,
      offsetX = player.stepX * tileStep,
      offsetY = player.stepY * tileStep,
      height = this.image.naturalHeight; // we draw this from the bottom

    ctx.drawImage(this.image, decorationX - offsetX, decorationY - offsetY - height + settings.terrain.tileSize);

    for (let i = 0; i < this.passMap.length; i++) {
      let mapEntry = map[this.x + i][this.y];
      mapEntry.passable = this.passMap[i];
      mapEntry.decoration = this;

      if (window.debug && !this.passMap[i]) {
        let debugX = (this.x + i) * settings.terrain.tileSize - mapOffsetX;

        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.strokeStyle = this.colour;
        ctx.rect(debugX - offsetX, decorationY - offsetY, settings.terrain.tileSize, settings.terrain.tileSize);
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  startInteraction(worldMap) {
    let interaction = new ObjectInteraction(this);
    interaction.worldMap = worldMap;

    return interaction;
  }

  sendResponse(conversationOption, interaction) {
    Util.log(conversationOption.value);

    if (conversationOption.callback) {
      conversationOption.callback();
    }

    if (!this.responses[conversationOption.key]) {
      interaction.returnToWorldMap();
    } else {
      let response = this.responses[conversationOption.key];
      interaction.selectedConversationOption = 0;
      interaction.lines = response.lines;
      interaction.conversationOptions = response.conversationOptions;
    }
  }

  resetInteractions() {
    this.conversationOptions = [];
    this.responses = {};
  }

  addConversationOption(key, value, parentKey = null, callback = () => {}) {
    let destination = this.conversationOptions;
    if (parentKey) destination = this.responses[parentKey].conversationOptions;

    destination.push({ key, value, callback });
  }

  addResponse(key, lines) {
    if (typeof lines === 'string') lines = [lines];
    this.responses[key] = { lines, conversationOptions: [] };
  }

  importInteractionData() {
    // TODO: Import data from json file
  }
}

export { Decorative };
