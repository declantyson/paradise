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

class Zenith extends Person {
    constructor() {
        super('Zenith', genders.alien);

        this.colour = colours.green;
        this.relationships = {
            'Quazar' : {
                description : 'Brother',
                value: 85
            }
        };
    }
}

export { Zenith };
