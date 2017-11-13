/*
 *
 *  XL RPG/Person/John
 *  XL Gaming/Declan Tyson
 *  v0.0.10
 *  13/11/2017
 *
 */

import { Person } from './baseperson';
import { genders } from '../constants';

class John extends Person {
    constructor() {
        super("John", genders.male);
    }
}

export { John };
