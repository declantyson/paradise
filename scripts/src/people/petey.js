/*
 *
 *  XL RPG/Person/Petey
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { ParadisePerson } from "../paradise_person";

class Petey extends ParadisePerson {
    constructor() {
        super("Petey", genders.male);
    }
}

export { Petey };
