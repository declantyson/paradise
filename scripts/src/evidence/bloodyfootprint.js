/*
 *
 *  CODENAME: Paradise/Evidence/Bloody Footprint
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class BloodyFootprint extends Evidence {
    constructor(incriminates, location) {
        super('Bloody Footprint', `a bloody footprint`, incriminates, location);

        this.addMotiveBias('Psychosis', 40);
        this.addMotiveBias('Passion', 20);
        this.addMotiveBias('InheritanceScam', 5);
    }
}

export { BloodyFootprint };