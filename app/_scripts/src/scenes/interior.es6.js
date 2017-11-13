/*
 *
 *  XL RPG/Scene-Interior
 *  XL Gaming/Declan Tyson
 *  v0.0.11
 *  13/11/2017
 *
 */

import * as util from '../util';
import { Scene } from "./scene";
import { canvasProperties, colours } from "../constants";

class Interior extends Scene {
    constructor(inhabitance) {
        super();

        this.inhabitance = inhabitance;
        util.log(inhabitance.name);
    }

    draw(ctx) {
        ctx.strokeStyle = colours.green;
        ctx.rect(0, 0, canvasProperties.width, canvasProperties.height);
        ctx.fill();
    }
}

export { Interior };
