/*
 *
 *  Paradise/Person/Petey
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { Person } from '../engine/person';

class Petey extends Person {
  constructor() {
    super('Petey', genders.male);
  }
}

export { Petey };
