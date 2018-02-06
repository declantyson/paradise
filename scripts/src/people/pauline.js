/*
 *
 *  XL RPG/Person/Pauline
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  13/11/2017
 *
 */

import { Person } from '../engine/baseperson';
import { genders } from '../engine/constants';

class Pauline extends Person {
    constructor() {
        super("Pauline", genders.female);
    }
}

export { Pauline };
