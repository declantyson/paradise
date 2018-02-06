/*
 *
 *  XL RPG/Locales/Grove Street House Template
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

import { Interior } from "../../engine/baselocale";

class GroveStreetTemplate extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.initialise(100, 100);

        this.spawnPoints.push({ x: 33, y: 35 });
        this.spawnPoints.push({ x: 39, y: 36 });
        this.spawnPoints.push({ x: 45, y: 32 });
        this.spawnPoints.push({ x: 28, y: 33 });

        this.terrainPaint(0, 0, 100, 100, "Blank");
        this.terrainPaint(25, 25, 25, 25, "Wall");
        this.terrainPaint(26, 26, 11, 23, "WoodenFloor");
        this.terrainPaint(38, 26, 11, 23, "WoodenFloor");
        this.terrainPaint(37, 37, 1, 1, "WoodenFloor");
    }
}

export { GroveStreetTemplate };