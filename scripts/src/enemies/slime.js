/*
 *
 *  Paradise/Enemies/Slime
 *  Declan Tyson
 *  v0.0.95
 *  06/05/2020
 *
 */

import { Enemy } from '../engine/enemy';

class Slime extends Enemy {
  constructor() {
    super('Slime', 20, 5, 2);
  }
}

export { Slime };
