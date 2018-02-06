/*
 *
 *  XL RPG/Person/Neil
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { ParadisePerson } from "../paradise_person";

class Neil extends ParadisePerson {
    constructor() {
        super("Neil", genders.male);
    }
}

export { Neil };
