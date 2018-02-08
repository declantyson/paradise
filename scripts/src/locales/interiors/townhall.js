/*
 *
 *  Paradise/Locales/Town Hall
 *  Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

import { Village } from "../village";
import { GroveStreetTemplate } from './grovestreethouse';

class TownHall extends GroveStreetTemplate {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.id = 'TownHall';
        this.entryPoints.frontDoor = { x: 48, y: 48 };

        this.entrances[49][48] = {
            locale: new Village(player, people),
            entryPoint: 'townHall'
        };

        this.terrainPaint(49, 48, 1, 1, 'WoodenFloor');
    }
}

export { TownHall };
