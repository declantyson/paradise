/*
 *
 *  XL RPG/Person/Quazar
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  05/02/2018
 *
 */

import { Person } from '../engine/person';
import { genders, colours } from '../constants';

class Zenith extends Person {
    constructor() {
        super("Zenith", genders.alien);

        this.colours = colours.green;
        this.relationships = {
            "Quazar" : {
                description : "Brother",
                value: 85
            }
        };
    }
}

export { Zenith };
