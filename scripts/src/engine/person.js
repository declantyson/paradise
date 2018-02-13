/*
 *
 *  Paradise/Person
 *  Declan Tyson
 *  v0.0.45
 *  13/02/2018
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
        this.responses = {};
        this.lines = ["I'm a default character, short and stout.", "Here's my handle, here's my spout."];
        this.conversationOptions = [{
            "key" : "Kettle",
            "value" : "I'll go put the kettle on"
        }];

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

    sendResponse(conversationOption, interaction) {
        Util.log(conversationOption.value);

        if(!this.responses[conversationOption.key]) {
            interaction.returnToWorldMap();
        } else {
            interaction.selectedConversationOption = 0;
            interaction.lines = this.responses[conversationOption.key].lines;
            interaction.conversationOptions = this.responses[conversationOption.key].conversationOptions;
        }
    }
}

export { Person };
