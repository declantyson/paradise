/*
 *
 *  XL RPG/Person/John
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  13/11/2017
 *
 */

import { Person } from '../engine/baseperson';
import { genders } from '../engine/constants';

class John extends Person {
    constructor() {
        super("John", genders.male);
    }
}

export { John };
