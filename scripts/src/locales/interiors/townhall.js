/*
 *
 *  Paradise/Locales/Town Hall
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
 *
 */

import { Village } from '../village';
import { GroveStreetTemplate } from './grovestreethouse';

class TownHall extends GroveStreetTemplate {
  constructor(player, people, inhabitance) {
    super(player, people, inhabitance);

    this.id = 'TownHall';
    this.entryPoints.frontDoor = { x: 36, y: 36 };

    this.entrances[36][37] = {
      locale: 'Village',
      entryPoint: 'townHall',
    };

    this.terrainPaint(36, 37, 1, 1, 'WoodenFloor');
  }
}

export { TownHall };
