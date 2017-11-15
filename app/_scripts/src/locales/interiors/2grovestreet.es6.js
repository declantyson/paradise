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

class GroveStreet2 extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = "2GroveStreet";
        this.entryPoints.frontDoor = { x: 26, y: 48 };

        this.initialise(100, 100);

        this.entrances[25][48] = {
            locale: new Islands(player, people),
            entryPoint: "groveStreet2"
        };

        this.terrainPaint(0, 0, 100, 100, "Blank");
        this.terrainPaint(25, 25, 25, 25, "Wall");
        this.terrainPaint(26, 26, 11, 23, "WoodenFloor");
        this.terrainPaint(38, 26, 11, 23, "WoodenFloor");
        this.terrainPaint(37, 37, 1, 1, "WoodenFloor");
        this.terrainPaint(25, 48, 1, 1, "WoodenFloor");
    }
}

export { GroveStreet2 };
