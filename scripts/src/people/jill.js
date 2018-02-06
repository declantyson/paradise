/*
 *
 *  XL RPG/Person/Jill
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  13/11/2017
 *
 */

import { Person } from '../engine/person';
import { genders } from '../constants';

class Jill extends Person {
    constructor() {
        super("Jill", genders.female);
    }
}

export { Jill };
