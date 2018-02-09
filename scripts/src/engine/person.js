/*
 *
 *  Paradise/Person
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { Util } from './util';
import { colours, posessivePronouns } from '../constants';

class Person {
    constructor(name, gender) {
        this.id = name;
        this.name = name;
        this.gender = gender;
        this.colour = colours.black;

        this.relationships = {};
    }

    randomizeRelationships() {
        Object.keys(this.relationships).forEach((name) => {
            let relationship = this.relationships[name],
                oldValue = relationship.value,
                newValue = Math.floor(Math.random() * 99);

            Util.log(`${this.name}'s relationship with ${posessivePronouns[this.gender]} ${relationship.description}, ${name}, goes from ${oldValue} to ${newValue}.`);
            this.relationships[name].value = newValue;
        });
    }

    addAcquaintanceRelationship(person) {
       this.relationships[person] = {
           description : 'Acquaintance',
           value: 50
       };
    }
}

export { Person };
