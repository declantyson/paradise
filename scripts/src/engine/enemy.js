/*
 *
 *  Paradise/Enemy
 *  Declan Tyson
 *  v0.0.95
 *  06/05/2020
 *
 */

import { colours } from '../constants';

class Enemy {
  constructor(name, health, attack, defence) {
    this.id = name;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defence = defence;
    this.colour = colours.black;
  }

  attack(target) {
    let attackValue = this.attack - target.defence;
    if (attackValue < 0) attackValue = 1;

    target.health -= attackValue;
  }
}

export { Enemy };
