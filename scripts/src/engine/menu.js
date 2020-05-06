/*
 *
 *  Paradise/Scene-Menu
 *  Declan Tyson
 *  v0.0.92
 *  21/10/2019
 *
 */

import { Scene } from './scene';
import { settings } from '../settings';
import { colours } from '../constants';

class Menu extends Scene {
  constructor(backgroundImageSrc, optionsArea) {
    super();

    const canvasProperties = settings.canvasProperties();

    this.selectedMenuItem = 0;

    this.keyHeld = true;
    this.menuItems = [];

    let backgroundImage = new Image();
    backgroundImage.src = backgroundImageSrc;
    this.backgroundImage = backgroundImage;

    this.actions.up = this.previousOption.bind(this);
    this.actions.down = this.nextOption.bind(this);
    this.actions.action = this.chooseOption.bind(this);

    this.optionsArea = optionsArea || {
      x: 0,
      y: 0,
      width: canvasProperties.width / 2,
      height: canvasProperties.height,
      optionsOffsetX: 40,
      optionsOffsetY: 100,
      optionHeight: 36,
    };
  }

  draw(ctx) {
    if (!this.game.keyHeld) this.keyHeld = false;
    const canvasProperties = settings.canvasProperties();

    ctx.drawImage(this.backgroundImage, 0, 0, canvasProperties.width, canvasProperties.height);
    this.drawOptions(ctx);
  }

  drawOptions(ctx) {
    const canvasProperties = settings.canvasProperties();

    let y = canvasProperties.height - this.optionsArea.height + this.optionsArea.optionsOffsetY;

    ctx.font = settings.get('fonts').small;
    ctx.fillStyle = colours.white;

    this.menuItems.forEach((menuItems, index) => {
      ctx.fillText(
        menuItems.value,
        this.optionsArea.x + this.optionsArea.optionsOffsetX,
        y + index * this.optionsArea.optionHeight
      );
      if (index === this.selectedMenuItem) {
        ctx.strokeStyle = colours.white;
        ctx.strokeRect(
          this.optionsArea.x + this.optionsArea.optionsOffsetX - this.optionsArea.optionHeight / 2,
          y + index * this.optionsArea.optionHeight - this.optionsArea.optionHeight / 1.5,
          this.optionsArea.width - this.optionsArea.optionsOffsetX,
          this.optionsArea.optionHeight
        );
      }
    });
  }

  nextOption() {
    if (this.keyHeld) return;

    if (this.selectedMenuItem < this.menuItems.length - 1) this.selectedMenuItem++;
    this.keyHeld = true;
  }

  previousOption() {
    if (this.keyHeld) return;

    if (this.selectedMenuItem > 0) this.selectedMenuItem--;
    this.keyHeld = true;
  }

  chooseOption() {
    if (this.keyHeld) return;

    this.menuItems[this.selectedMenuItem].callback();
    this.keyHeld = true;
  }

  addMenuItem(key, value, callback = () => {}) {
    this.menuItems.push({ key, value, callback });
  }
}

export { Menu };
