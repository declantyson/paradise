/*
 *
 *  Paradise/Locales/4 Grove Street
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
 *
 */

import { Islands } from '../islands';
import { GroveStreetTemplate } from './grovestreethouse';

class GroveStreet4 extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'GroveStreet4';
        this.entryPoints.frontDoor = { x: 26, y: 36 };

        this.entrances[25][36] = {
            locale: new Islands(player, people),
            entryPoint: 'groveStreet4'
        };

        this.terrainPaint(25, 36, 1, 1, 'WoodenFloor');
    }
}

export { GroveStreet4 };
