/*
 *
 *  XL RPG/Locales/4 Grove Street
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

import { Islands } from "../islands";
import { GroveStreetTemplate } from "./grovestreethouse";

class GroveStreet4 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = "2GroveStreet";
        this.entryPoints.frontDoor = { x: 26, y: 48 };

        this.entrances[25][48] = {
            locale: new Islands(player, people),
            entryPoint: "groveStreet4"
        };

        this.terrainPaint(25, 48, 1, 1, "WoodenFloor");
    }
}

export { GroveStreet4 };
