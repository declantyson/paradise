/*
 *
 *  XL RPG/Scene-Encounter
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import { Scene } from "./scene";
import { canvasProperties, colours } from "../constants";
import "../enemies/enemydirectory";

class Encounter extends Scene {
    constructor(enemies) {
        super();

        this.enemies = [];
        let self = this;
        enemies.forEach((enemy) => {
             self.enemies.push(new window.enemies[enemy]());
        });
    }

    draw(ctx) {
        ctx.strokeStyle = colours.black;
        ctx.rect(0, 0, canvasProperties.width, canvasProperties.height);
        ctx.fill();
    }
}

export { Encounter };