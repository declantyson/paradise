/*
 *
 *  XL RPG/Person/Zenith
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

import { Person } from '../engine/baseperson';
import { genders, colours } from '../engine/constants';

class Quazar extends Person {
    constructor() {
        super("Quazar", genders.alien);

        this.colour = colours.green;
        this.relationships = {
            "Zenith" : {
                description : "Brother",
                value: 85
            }
        };
    }
}

export { Quazar };
