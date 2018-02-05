/*
 *
 *  XL RPG/Person/Quazar
 *  XL Gaming/Declan Tyson
 *  v0.0.18
 *  05/02/2018
 *
 */

import { Person } from './baseperson';
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
