/*
 *
 *  XL RPG/Person/Quazar
 *  XL Gaming/Declan Tyson
 *  v0.0.17
 *  05/02/2018
 *
 */

import { Person } from './baseperson';
import { genders } from '../constants';

class Zenith extends Person {
    constructor() {
        super("Zenith", genders.alien);
    }
}

export { Zenith };
