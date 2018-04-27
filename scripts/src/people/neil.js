/*
 *
 *  Paradise/Person/Neil
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { Person } from '../engine/person';

class Neil extends Person {
  constructor() {
    super('Neil', genders.male);
  }
}

export { Neil };
