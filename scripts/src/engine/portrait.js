/*
 *
 *  Paradise/Portrait
 *  Declan Tyson
 *  v0.0.92
 *  21/10/2019
 *
 */

import { settings } from '../settings';

class Portrait {
  constructor(imageSrc) {
    let image = new Image();
    image.src = imageSrc;
    this.image = image;
    this.src = imageSrc;
    this.entering = false;
    this.exiting = false;
    this.frame = 0;
    this.frameIncrement = 1;
    this.maxFrames = 30;
  }

  draw(ctx) {
    const canvasProperties = settings.canvasProperties();

    if (this.entering) this.enter();
    if (this.exiting) this.exit();

    ctx.globalAlpha = this.frame / this.maxFrames;
    ctx.drawImage(
      this.image,
      0,
      0,
      canvasProperties.width,
      canvasProperties.height,
      canvasProperties.width - this.frame * (canvasProperties.width / 2 / this.maxFrames),
      0,
      canvasProperties.width,
      canvasProperties.height
    );
    ctx.globalAlpha = 1;
  }

  enter() {
    if (this.frame < this.maxFrames) {
      this.entering = true;
      this.frame += this.frameIncrement;
    } else {
      this.entering = false;
    }
  }

  enterWithoutAnimation() {
    this.frame = this.maxFrames;
    this.entering = false;
  }

  exitWithoutAnimation() {
    this.frame = 0;
    this.exiting = false;
  }

  exit() {
    if (this.frame > 0) {
      this.frame -= this.frameIncrement;
    } else {
      this.exiting = false;
    }
  }
}

export { Portrait };
