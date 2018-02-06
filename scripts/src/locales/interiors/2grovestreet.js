/*
 *
 *  XL RPG/Locales/1 Grove Street
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { Islands } from "../islands";
import { GroveStreetTemplate } from "./grovestreethouse";

class GroveStreet2 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = "GroveStreet2";
        this.entryPoints.frontDoor = { x: 26, y: 48 };

        this.entrances[25][48] = {
            locale: new Islands(player, people),
            entryPoint: "groveStreet2"
        };

        this.terrainPaint(25, 48, 1, 1, "WoodenFloor");
    }
}

export { GroveStreet2 };
