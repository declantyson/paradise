/*
 *
 *  XL RPG/Person
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  05/02/2018
 *
 */

import * as util from './util';
import { colours, pronouns } from './constants';


class Person {
    constructor(name, gender) {
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

            util.log(`${this.name}'s relationship with ${pronouns[this.gender]} ${relationship.description}, ${name}, goes from ${oldValue} to ${newValue}.`);
            this.relationships[name].value = newValue;
        });
    }

    addAcquaintanceRelationship(person) {
       this.relationships[person] = {
           description : "Acquaintance",
           value: 50
       };
    }
}

export { Person };
