/*
 *
 *  XL RPG/Person/Zenith
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders, colours } from '../constants';
import { ParadisePerson } from "../paradise_person";

class Quazar extends ParadisePerson {
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
