/*
 *
 *  CODENAME: Paradise/Evidence/Pregnancy Test
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class PregnancyTest extends Evidence {
    constructor(incriminates, location) {
        super('Pregnancy Test', `a positive pregnancy test`, incriminates, location);

        this.addMotiveBias('Passion', 50);
        this.addMotiveBias('InheritanceScam', 15);
    }
}

export { PregnancyTest };