/*
 *
 *  XL RPG/Person/Quazar
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders, colours } from '../constants';
import { ParadisePerson } from "../paradise_person";

class Zenith extends ParadisePerson {
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
