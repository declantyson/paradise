/*
 *
 *  CODENAME: Paradise/Evidence/Threatening Note
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class ThreateningNote extends Evidence {
    constructor(incriminates, location) {
        super('Threatening Note', `an unsigned handwritten note to ${window.game.victim} that reads, "I'm going to murder you".`, incriminates, location);

        this.addMotiveBias('Psychosis', 40);
        this.addMotiveBias('Passion', 10);
        this.addMotiveBias('InheritanceScam', 40);
    }
}

export { ThreateningNote };