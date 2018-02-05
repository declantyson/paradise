/*
 *
 *  XL RPG/Person/Zenith
 *  XL Gaming/Declan Tyson
 *  v0.0.17
 *  05/02/2018
 *
 */

import { Person } from './baseperson';
import { genders } from '../constants';

class Quazar extends Person {
    constructor() {
        super("Quazar", genders.alien);

        this.relationships = {
            "Zenith" : {
                description : "Brother",
                value: 85
            }
        };
    }
}

export { Quazar };
