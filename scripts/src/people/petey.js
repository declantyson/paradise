/*
 *
 *  XL RPG/Person/Petey
 *  XL Gaming/Declan Tyson
 *  v0.0.10
 *  13/11/2017
 *
 */

import { Person } from './baseperson';
import { genders } from '../constants';

class Petey extends Person {
    constructor() {
        super("Petey", genders.male);
    }
}

export { Petey };
