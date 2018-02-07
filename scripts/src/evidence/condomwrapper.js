/*
 *
 *  CODENAME: Paradise/Evidence/Condom Wrapper
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class CondomWrapper extends Evidence {
    constructor(incriminates, location) {
        super('Condom Wrapper', `an open, empty condom wrapper`, incriminates, location);

        this.addMotiveBias('Passion', 30);
    }
}

export { CondomWrapper };