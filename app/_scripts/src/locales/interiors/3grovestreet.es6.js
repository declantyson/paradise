/*
 *
 *  XL RPG/Locales/1 Grove Street
 *  XL Gaming/Declan Tyson
 *  v0.0.15
 *  15/11/2017
 *
 */

import { Interior } from "../baselocale"
import { Islands } from "../islands"

class GroveStreet3 extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = "3GroveStreet";
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.initialise(100, 100);

        this.entrances[49][48] = {
            locale: new Islands(player, people),
            entryPoint: "groveStreet3"
        };

        this.terrainPaint(0, 0, 100, 100, "Blank");
        this.terrainPaint(25, 25, 25, 25, "Wall");
        this.terrainPaint(26, 26, 11, 23, "WoodenFloor");
        this.terrainPaint(38, 26, 11, 23, "WoodenFloor");
        this.terrainPaint(37, 37, 1, 1, "WoodenFloor");
        this.terrainPaint(49, 48, 1, 1, "WoodenFloor");
    }
}

export { GroveStreet3 };
