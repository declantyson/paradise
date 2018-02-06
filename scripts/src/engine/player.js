/*
 *
 *  XL RPG/Player
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import { colours, directions } from "../constants";

class Player {
    constructor() {
        this.colour = colours.black;
        this.direction = directions.down;
    }

    setPlacement(x, y) {
        this.x = x;
        this.y = y;
    }
}

export { Player };