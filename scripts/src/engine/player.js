/*
 *
 *  XL RPG/Player
 *  XL Gaming/Declan Tyson
 *  v0.0.29
 *  08/02/2018
 *
 */

import { colours, directions } from '../constants';

class Player {
    constructor() {
        this.colour = colours.black;
        this.direction = directions.down;

        let sprite_test = new Image(),
            spriteMap_test = {};

        sprite_test.src = '/img/char_test.png';
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

    setPlacement(x, y) {
        this.x = x;
        this.y = y;
    }

    setDirection(direction) {
        this.direction = direction;
        this.sprite.y = this.spriteMap[direction];
    }
}

export { Player };