/*
 *
 *  Paradise/Party Member
 *  Declan Tyson
 *  v0.0.97
 *  06/05/2020
 *
 */

import { actions } from "../constants";

class PartyMember {
  constructor(name, health, baseAttack, baseDefence, baseSpeed, sprite) {
    this.id = name;
    this.name = name;
    this.health = health;
    this.baseAttack = baseAttack;
    this.attack = baseAttack;
    this.baseDefence = baseDefence;
    this.defence = baseDefence;
    this.speed = baseSpeed;

    this.actions = [];

    this.experience = 0;
    this.level = 1;

    let image = new Image();
    image.src = sprite;
    this.sprite = image;

    this.baseActions();
  }

  attack(target) {
    let attackValue = this.attack - target.defence;
    if (attackValue < 0) attackValue = 1;

    target.health -= attackValue;
  }

  defend() {
    this.defence = this.baseDefence * 1.2;
  }

  baseActions() {
      this.actions.push({
        name: actions.attack,
        callback: this.attack
      });

      this.actions.push({
        name: actions.defend,
        callback: this.defend
      });
  }
}

export { PartyMember };
