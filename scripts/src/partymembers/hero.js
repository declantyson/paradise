/*
 *
 *  Paradise/Party Members/Hero
 *  Declan Tyson
 *  v0.0.97
 *  06/05/2020
 *
 */

import { colours } from '../constants';
import { PartyMember } from '../engine/partymember';

class Hero extends PartyMember {
  constructor() {
    super('Hero', 100, 7, 6, 5, '/img/PartyMembers/hero.png');
    this.colour = colours.gold;
  }
}

export { Hero };
