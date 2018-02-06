/*
 *
 *  XL RPG/Person/Jill
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  13/11/2017
 *
 */

import { Person } from '../engine/baseperson';
import { genders } from '../engine/constants';

class Jill extends Person {
    constructor() {
        super("Jill", genders.female);
    }
}

export { Jill };
