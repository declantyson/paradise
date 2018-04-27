/*
 *
 *  Paradise/Person/Jill
 *  Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { Person } from '../engine/person';

class Jill extends Person {
  constructor() {
    super('Jill', genders.female);

    this.relationships = {
      John: {
        description: 'Husband',
        value: 45,
      },
    };
  }
}

export { Jill };
