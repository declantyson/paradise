/*
 *
 *  XL RPG/Scene-Interaction
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import { Scene } from "./scene";
import { canvasProperties, colours } from "./constants";

class Interaction extends Scene {
    constructor(person) {
        super();

        console.log(person);
    }

    draw(ctx) {
        ctx.strokeStyle = colours.black;
        ctx.rect(0, 0, canvasProperties.width, canvasProperties.height);
        ctx.fill();
    }
}

export { Interaction };