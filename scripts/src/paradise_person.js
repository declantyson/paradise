/*
 *
 *  XL RPG/Person
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import * as util from './engine/util';

import { Person } from "./engine/person";

class ParadisePerson extends Person {
    constructor(name, gender) {
        super(name, gender);

        this.evidence = [];
    }
}

export { ParadisePerson };
