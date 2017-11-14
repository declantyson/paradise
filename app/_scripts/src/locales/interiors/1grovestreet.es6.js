/*
 *
 *  XL RPG/Locales/1 Grove Street
 *  XL Gaming/Declan Tyson
 *  v0.0.12
 *  14/11/2017
 *
 */

import { Interior } from "../baselocale"

class GroveStreet1 extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.entryPoints.beginningOfGame = { x: 55, y: 17 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, "Water");
        this.terrainPaint(52, 17, 10, 20, "Grass");
        this.terrainPaint(42, 35, 2, 8, "Grass");
        this.terrainPaint(55, 17, 2, 20, "Road");
    }
}

export { GroveStreet1 };
