/*
 *
 *  XL RPG/Person/Quazar
 *  XL Gaming/Declan Tyson
 *  v0.0.10
 *  13/11/2017
 *
 */

import { Person } from './baseperson';
import { genders } from '../constants';

class Quazar extends Person {
    constructor() {
        super("Quazar", genders.alien);
    }
}

export { Quazar };
