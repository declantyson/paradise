/*
 *
 *  CODENAME: Paradise/Evidence/Bloody Shirt
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class BloodyShirt extends Evidence {
    constructor(incriminates, location) {
        super('Bloody Shirt', `a bloody shirt`, incriminates, location);

        this.addMotiveBias('Psychosis', 40);
        this.addMotiveBias('Passion', 20);
        this.addMotiveBias('InheritanceScam', 5);
    }
}

export { BloodyShirt };