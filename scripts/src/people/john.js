/*
 *
 *  XL RPG/Person/John
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { ParadisePerson } from "../paradise_person";

class John extends ParadisePerson {
    constructor() {
        super("John", genders.male);
    }
}

export { John };
