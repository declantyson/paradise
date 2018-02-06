/*
 *
 *  XL RPG/Person/Evelyn
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  13/11/2017
 *
 */

import { Person } from '../engine/baseperson';
import { genders } from '../engine/constants';

class Evelyn extends Person {
    constructor() {
        super("Evelyn", genders.female);
    }
}

export { Evelyn };
