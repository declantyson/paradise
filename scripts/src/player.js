/*
 *
 *  XL RPG/Player
 *  XL Gaming/Declan Tyson
 *  v0.0.3
 *  23/12/2016
 *
 */

import { colours } from "./constants";

class Player {
    constructor() {
        this.colour = colours.black;
    }

    setPlacement(x, y) {
        this.x = x;
        this.y = y;
    }
}

export { Player };