/*
 *
 *  XL RPG/Person/Jill
 *  XL Gaming/Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */


import { genders } from '../constants';
import { ParadisePerson } from '../paradise_person';

class Jill extends ParadisePerson {
    constructor() {
        super('Jill', genders.female);

        this.relationships = {
            'John' : {
                description : 'Husband',
                value: 45
            }
        };
    }
}

export { Jill };
