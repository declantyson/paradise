/*
 *
 *  Paradise/Person/Zenith
 *  Declan Tyson
 *  v0.0.44
 *  13/02/2018
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
                "lines" : ["<3"],
                "conversationOptions" : [{
                    "key" : "Goodbye",
                    "value" : "Goodbye"
                }]
            },
            "Truth" : {
                "lines" : ["I know... :("],
                "conversationOptions" : [{
                    "key" : "Goodbye",
                    "value" : "Goodbye"
                }]
            },
            "Mean" : {
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
