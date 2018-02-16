/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { genders, colours } from '../constants';
import { Person } from '../engine/person';

class Quazar extends Person {
    constructor() {
        super('Quazar', genders.alien);

        this.colour = colours.green;
        this.relationships = {
            'Zenith' : {
                description : 'Roommate',
                value: 85
            }
        };
    }
}

export { Quazar };
