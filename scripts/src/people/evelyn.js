/*
 *
 *  Paradise/Person/Evelyn
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { Person } from '../engine/person';

class Evelyn extends Person {
  constructor() {
    super('Evelyn', genders.female);
  }
}

export { Evelyn };
