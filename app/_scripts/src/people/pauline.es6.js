/*
 *
 *  XL RPG/Person/Pauline
 *  XL Gaming/Declan Tyson
 *  v0.0.10
 *  13/11/2017
 *
 */

import { Person } from './baseperson';
import { genders } from '../constants';

class Pauline extends Person {
    constructor() {
        super("Pauline", genders.female);
    }
}

export { Pauline };
