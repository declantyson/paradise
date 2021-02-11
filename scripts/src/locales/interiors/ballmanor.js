/*
 *
 *  Paradise/Locales/Ball Manor
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
 *
 */

import { Islands } from '../islands';
import { GroveStreetTemplate } from './grovestreethouse';
import { Dresser } from '../decorative/dresser';
import { Rug } from '../decorative/rug';

class BallManor extends GroveStreetTemplate {
  constructor(player, people, inhabitance) {
    super(player, people, inhabitance);

    this.id = 'BallManor';
    this.entryPoints.frontDoor = { x: 36, y: 36 };

    this.entrances[36][37] = {
      locale: 'Islands',
      entryPoint: 'ballManor',
    };

    this.terrainPaint(36, 37, 1, 1, 'WoodenFloor');

    this.addDecoration(new Dresser(26, 26));
    this.addDecoration(new Rug(32, 32));
  }
}

export { BallManor };
