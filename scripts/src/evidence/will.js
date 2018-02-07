/*
 *
 *  CODENAME: Paradise/Evidence/Will
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class Will extends Evidence {
    constructor(incriminates, location) {
        super('Will', `a will that names ${incriminates} as the sole heir to ${window.game.victim}'s fortunes`, incriminates, location);

        this.addMotiveBias('InheritanceScam', 50);
    }
}

export { Will };