/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.46
 *  14/02/2018
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
        this.lines = ["I am so lonely..."];
        this.conversationOptions = [{
                "key" : "Nice",
                "value" : "Happy Valentine's Day!"
            },{
                "key" : "Truth",
                "value" : "You're going to die alone"
            },{
                "key" : "Mean",
                "value" : "LOL!"
            }];
        this.responses = {
            "Nice" : {
                "mood" : "neutral",
                "lines" : ["<3"],
                "conversationOptions" : [{
                    "key" : "Goodbye",
                    "value" : "Goodbye"
                }]
            },
            "Truth" : {
                "mood" : "neutral",
                "lines" : ["I know... :("],
                "conversationOptions" : [{
                    "key" : "Goodbye",
                    "value" : "Goodbye"
                }]
            },
            "Mean" : {
                "mood" : "angry",
                "lines" : ["Screw you! >:("],
                "conversationOptions" : [{
                    "key" : "Confront",
                    "value" : "What are you gonna do!?"
                },{
                    "key" : "Goodbye",
                    "value" : "Goodbye"
                }]
            },
            "Confront" : {
                "mood" : "sad",
                "lines" : ["Nothing... I'm so lonely..."],
                "conversationOptions" : [{
                    "key" : "Nice",
                    "value" : "Happy Valentine's Day!"
                },{
                    "key" : "Truth",
                    "value" : "You're going to die alone"
                },{
                    "key" : "Mean",
                    "value" : "LOL!"
                }]
            },
        };
    }
}

export { Zenith };
