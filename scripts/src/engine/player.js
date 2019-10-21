/*
 *
 *  Paradise/Player
 *  Declan Tyson
 *  v0.0.92
 *  21/10/2019
 *
 */

import { colours, directions } from '../constants';
import { settings } from '../settings';

class Player {
  constructor() {
    this.colour = colours.black;
    this.direction = directions.down;
    this.stepX = 0;
    this.stepY = 0;

    let sprite_test = new Image(),
      spriteMap_test = {};

    sprite_test.src = '/oob/char_test.png';
    spriteMap_test[directions.up] = 0;
    spriteMap_test[directions.down] = 128;
    spriteMap_test[directions.left] = 64;
    spriteMap_test[directions.right] = 192;

    this.spriteMap = spriteMap_test;
    this.sprite = {
      image: sprite_test,
      x: 0,
      y: 128,
    };
  }

  advanceFrame() {
    const character = settings.get('character');
    let newSpriteX = this.sprite.x + character.frameSize;
    if (newSpriteX >= character.frameSize * character.frameCount) {
      newSpriteX = 0;
    }

    this.sprite.x = newSpriteX;
  }

  resetSprite() {
    this.sprite.x = 0;
  }

  setPlacement(x, y, init = false) {
    const character = settings.get('character');
    if (x !== this.x) {
      if (this.stepX >= character.stepsPerTile || this.stepX < 0 || init) {
        this.x = x;
        if (this.stepX >= character.stepsPerTile) this.stepX = 0;
        if (this.stepX < 0) this.stepX = character.stepsPerTile - 1;
      } else {
        if (x > this.x) this.stepX++;
        if (x < this.x) this.stepX--;
      }
    }

    if (y !== this.y) {
      if (this.stepY >= character.stepsPerTile || this.stepY < 0 || init) {
        this.y = y;
        if (this.stepY >= character.stepsPerTile) this.stepY = 0;
        if (this.stepY < 0) this.stepY = character.stepsPerTile - 1;
      } else {
        if (y > this.y) this.stepY++;
        if (y < this.y) this.stepY--;
      }
    }
  }

  setDirection(direction) {
    const character = settings.get('character');
    if (direction === directions.left || direction === directions.right) {
      if (this.stepX >= character.stepsPerTile) this.stepX = character.stepsPerTile - 1;
      if (this.stepX < 0) this.stepX = 0;
    } else if (direction === directions.up || direction === directions.down) {
      if (this.stepY >= character.stepsPerTile) this.stepY = character.stepsPerTile - 1;
      if (this.stepY < 0) this.stepY = 0;
    }

    this.direction = direction;
    this.sprite.y = this.spriteMap[direction];
  }
}

export { Player };
