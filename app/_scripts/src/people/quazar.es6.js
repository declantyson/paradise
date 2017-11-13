/*
 *
 *  XL RPG/Person/Zenith
 *  XL Gaming/Declan Tyson
 *  v0.0.10
 *  13/11/2017
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
