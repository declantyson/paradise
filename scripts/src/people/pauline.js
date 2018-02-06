/*
 *
 *  XL RPG/Person/Pauline
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { ParadisePerson } from '../paradise_person';

class Pauline extends ParadisePerson {
    constructor() {
        super('Pauline', genders.female);
    }
}

export { Pauline };
