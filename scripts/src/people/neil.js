/*
 *
 *  XL RPG/Person/Neil
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  13/11/2017
 *
 */

import { Person } from '../engine/baseperson';
import { genders } from '../engine/constants';

class Neil extends Person {
    constructor() {
        super("Neil", genders.male);
    }
}

export { Neil };
