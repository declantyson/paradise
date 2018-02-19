/*
 *
 *  Paradise/Decorative/Dresser
 *  Declan Tyson
 *  v0.0.60
 *  19/02/2018
 *
 */

import { Decorative } from '../../engine/decorative';

class Dresser extends Decorative {
    constructor(x, y) {
        super('Dresser', 'a fancy dresser', '/oob/Decorative/dresser.png', x, y, [false, false]);
        this.lines = [`It's a fancy dresser.`];
        this.conversationOptions = [{
            "key" : "Search",
            "value" : "Open the drawers",
        },
        {
            "key" : "FreakOut",
            "value" : "Touch the mysterious looking button",
            "callback" : () => {
                this.scream();
            }
        }
        ,{
            "key" : "Leave",
            "value" : "That's nice."
        }];

        this.responses = {
            "Search" : {
                "lines" : ["You find nothing but a dead fly.", "Hopefully he had a fulfilling life."],
                "conversationOptions" : [{
                    "key" : "Leave",
                    "value" : "Shut the drawer and go elsewhere."
                }]
            },
            "FreakOut" : {
                "lines" : ["Well that was horrifying."],
                "conversationOptions" : [{
                    "key" : "Leave",
                    "value" : "Go elsewhere."
                },{
                    "key" : "FreakOut",
                    "value" : "Press the button again",
                    "callback" : () => {
                        this.scream();
                    }
                }]
            }
        }
    }

    scream() {
        alert("Y O U H A V E N O P O W E R H E R E");
    }
}

export { Dresser };