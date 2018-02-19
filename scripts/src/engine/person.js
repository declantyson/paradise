/*
 *
 *  Paradise/Person
 *  Declan Tyson
 *  v0.0.60
 *  19/02/2018
 *
 */

import { Util } from './util';
import { colours, posessivePronouns } from '../constants';
import { Portrait } from './portrait';
import { Interaction } from './interaction';

class Person {
    constructor(name, gender, mood = 'neutral') {
        this.id = name;
        this.name = name;
        this.gender = gender;
        this.mood = mood;
        this.colour = colours.black;
        this.responses = {};
        this.lines = ["I'm a default character, short and stout.", "Here's my handle, here's my spout."];
        this.conversationOptions = [{
            "key" : "Kettle",
            "value" : "I'll go put the kettle on"
        }];
        this.portraitFolder = '/oob/Portraits/Test';
        this.portraits = {
            neutral : new Portrait(`${this.portraitFolder}/default.png`, this),
            angry : new Portrait(`${this.portraitFolder}/angry.png`, this),
        };
        this.currentPortrait = this.portraits[this.mood];

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

    startInteraction(worldMap) {
        let interaction = new Interaction(this);
        interaction.worldMap = worldMap;
        this.currentPortrait = this.portraits[this.mood];
        this.currentPortrait.enter();

        return interaction;
    }

    sendResponse(conversationOption, interaction) {
        Util.log(conversationOption.value);

        if(conversationOption.callback) {
            conversationOption.callback();
        }

        if(!this.responses[conversationOption.key]) {
            interaction.returnToWorldMap();
        } else {
            let response = this.responses[conversationOption.key];
            interaction.selectedConversationOption = 0;
            interaction.lines = response.lines;

            let mood = response.mood;
            if(!this.portraits[mood]) mood = 'neutral';
            this.currentPortrait.exitWithoutAnimation();
            this.currentPortrait = this.portraits[mood];
            this.currentPortrait.enterWithoutAnimation();

            interaction.conversationOptions = response.conversationOptions;
        }
    }
}

export { Person };
