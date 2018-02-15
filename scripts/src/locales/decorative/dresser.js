/*
 *
 *  Paradise/Decorative/Dresser
 *  Declan Tyson
 *  v0.0.50
 *  15/02/2018
 *
 */

import { Decorative } from '../../engine/decorative';

class Dresser extends Decorative {
    constructor(x, y) {
        super('Dresser', 'a fancy dresser', '/oob/Decorative/dresser.png', x, y, [false, false]);
        this.lines = [`It's a fancy dresser.`];
        this.conversationOptions = [{
            "key" : "Search",
            "value" : "Open the drawers"
        },{
            "key" : "Leave",
            "value" : "That's nice."
        }];
        this.responses = {
            "Search" : {
                "lines" : ["You find nothing but a dead fly."],
                "conversationOptions" : [{
                    "key" : "Leave",
                    "value" : "Shut the drawer and go elsewhere."
                }]
            }
        }
    }
}

export { Dresser };