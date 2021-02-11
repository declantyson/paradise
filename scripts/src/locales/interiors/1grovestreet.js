/*
 *
 *  Paradise/Locales/1 Grove Street
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
 *
 */

import { Islands } from '../islands';
import { GroveStreetTemplate } from './grovestreethouse';

class GroveStreet1 extends GroveStreetTemplate {
  constructor(player, people, inhabitance) {
    super(player, people, inhabitance);

    this.id = 'GroveStreet1';
    this.entryPoints.frontDoor = { x: 36, y: 36 };

    this.entrances[37][36] = {
      locale: 'Islands',
      entryPoint: 'groveStreet1',
    };

    this.terrainPaint(37, 36, 1, 1, 'WoodenFloor');
  }
}

export { GroveStreet1 };
