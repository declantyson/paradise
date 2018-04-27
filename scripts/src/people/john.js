/*
 *
 *  Paradise/Person/John
 *  Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { Person } from '../engine/person';

class John extends Person {
  constructor() {
    super('John', genders.male);

    this.relationships = {
      Jill: {
        description: 'Wife',
        value: 45,
      },
    };
  }
}

export { John };
