/*
 *
 *  XL RPG/Locales/City
 *  XL Gaming/Declan Tyson
 *  v0.0.9
 *  13/11/2017
 *
 */

import { Locale } from "./baselocale"

class Islands extends Locale {
    constructor(player) {
        super(player);

        this.entryPoints.beginningOfGame = { x: 58, y: 20 };

        this.initialise(300, 300);

        this.terrainPaint(0, 0, 300, 300, "Water");
        this.terrainPaint(52, 17, 10, 20, "Grass");
        this.terrainPaint(42, 35, 2, 8, "Grass");
    }
}

export { Islands };
