/*
 *
 *  XL RPG/Person/Evelyn
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */


import { genders } from '../constants';
import {ParadisePerson} from "../paradise_person";

class Evelyn extends ParadisePerson {
    constructor() {
        super("Evelyn", genders.female);
    }
}

export { Evelyn };
