/*
 *
 *  Paradise/Person/Pauline
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { Person } from '../engine/person';

class Pauline extends Person {
    constructor() {
        super('Pauline', genders.female);
    }
}

export { Pauline };
