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
  constructor(name, health, attack, defence, sprite) {
    this.id = name;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defence = defence;

    let image = new Image();
    image.src = sprite;
    this.sprite = image;
  }

  attack(target) {
    let attackValue = this.attack - target.defence;
    if (attackValue < 0) attackValue = 1;

    target.health -= attackValue;
  }
}

export { Enemy };
