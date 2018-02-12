/*
 *
 *  Paradise/Locales/Ball Manor
 *  Declan Tyson
 *  v0.0.38
 *  12/02/2018
 *
 */

import { Islands } from '../islands';
import { GroveStreetTemplate } from './grovestreethouse';

class BallManor extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'BallManor';
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[48][49] = {
            locale: new Islands(player, people),
            entryPoint: 'ballManor'
        };

        this.terrainPaint(48, 49, 1, 1, 'WoodenFloor');
    }
}

export { BallManor };
