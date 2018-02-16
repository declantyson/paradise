/*
 *
 *  Paradise/Locales/Grove Street House Template
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
 *
 */

import { Interior } from '../../engine/locale';

class GroveStreetTemplate extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.initialise(100, 100);

        this.addSpawnPoint(31, 35);
        this.addSpawnPoint(29, 34);

        this.terrainPaint(0, 0, 100, 100, 'Blank');
        this.terrainPaint(25, 25, 13, 13, 'Wall');
        this.terrainPaint(26, 26, 11, 11, 'WoodenFloor');
    }
}

export { GroveStreetTemplate };