/*
 *
 *  Paradise/Enemies/Slime
 *  Declan Tyson
 *  v0.0.97
 *  06/05/2020
 *
 */

import { Enemy } from '../engine/enemy';
import { colours } from '../constants';

class Slime extends Enemy {
  constructor() {
    super('Slime', 20, 5, 2, 3, '/img/Enemies/slime.png');
    this.colour = colours.green;
  }
}

export { Slime };
