/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.60
 *  19/02/2018
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
        this.lines = [
            'Now this is the story all about how my life got flipped, turned upside down,',
            'and I\'d like to take a minute, just sit right there,',
            'I\'ll tell how I became the prince of a town called Bel-Air.'
        ]
    }
}

export { Quazar };
