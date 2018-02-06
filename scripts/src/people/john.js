/*
 *
 *  XL RPG/Person/John
 *  XL Gaming/Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */

import { genders } from '../constants';
import { ParadisePerson } from '../paradise_person';

class John extends ParadisePerson {
    constructor() {
        super('John', genders.male);

        this.relationships = {
            'Jill' : {
                description : 'Wife',
                value: 45
            }
        };
    }
}

export { John };
