/*
 *
 *  XL RPG/Person/Neil
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  13/11/2017
 *
 */

import { Person } from '../engine/person';
import { genders } from '../constants';

class Neil extends Person {
    constructor() {
        super("Neil", genders.male);
    }
}

export { Neil };
