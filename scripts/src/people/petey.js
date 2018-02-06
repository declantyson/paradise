/*
 *
 *  XL RPG/Person/Petey
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  13/11/2017
 *
 */

import { Person } from '../engine/baseperson';
import { genders } from '../engine/constants';

class Petey extends Person {
    constructor() {
        super("Petey", genders.male);
    }
}

export { Petey };
