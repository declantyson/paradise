/*
 *
 *  Paradise/Player
 *  Declan Tyson
 *  v0.0.41
 *  13/02/2018
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
            image : sprite_test,
            x : 0,
            y : 128
        };
    }

    advanceFrame() {
        let newSpriteX = this.sprite.x + settings.character.frameSize;
        if(newSpriteX >= settings.character.frameSize * settings.character.frameCount) {
            newSpriteX = 0;
        }

        this.sprite.x = newSpriteX;
    }

    resetSprite() {
        this.sprite.x = 0;
    }

    setPlacement(x, y, init = false) {
        if(x !== this.x) {
            if (this.stepX >= settings.character.stepsPerTile || this.stepX < 0 || init) {
                this.x = x;
                if(this.stepX >= settings.character.stepsPerTile) this.stepX = 0;
                if(this.stepX < 0) this.stepX = settings.character.stepsPerTile - 1;
            } else {
                if(x > this.x) this.stepX++;
                if(x < this.x) this.stepX--;
            }
        }

        if(y !== this.y) {
            if (this.stepY >= settings.character.stepsPerTile || this.stepY < 0 || init) {
                this.y = y;
                if(this.stepY >= settings.character.stepsPerTile) this.stepY = 0;
                if(this.stepY < 0) this.stepY = settings.character.stepsPerTile - 1;
            } else {
                if(y > this.y) this.stepY++;
                if(y < this.y) this.stepY--;
            }
        }

    }

    setDirection(direction) {
        if(direction === directions.left || direction === directions.right) {
            if (this.stepX >= settings.character.stepsPerTile) this.stepX = settings.character.stepsPerTile - 1;
            if (this.stepX < 0) this.stepX = 0;
        } else if(direction === directions.up || direction === directions.down) {
            if (this.stepY >= settings.character.stepsPerTile) this.stepY = settings.character.stepsPerTile - 1;
            if (this.stepY < 0) this.stepY = 0;
        }

        this.direction = direction;
        this.sprite.y = this.spriteMap[direction];
    }
}

export { Player };