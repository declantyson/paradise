/*
 *
 *  XL RPG/Locales/1 Grove Street
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  05/02/2018
 *
 */

import { Islands } from "../islands";
import { GroveStreetTemplate } from "./grovestreethouse";

class GroveStreet3 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = "3GroveStreet";
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[49][48] = {
            locale: new Islands(player, people),
            entryPoint: "groveStreet3"
        };

        this.terrainPaint(49, 48, 1, 1, "WoodenFloor");
    }
}

export { GroveStreet3 };