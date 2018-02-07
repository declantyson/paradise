/*
 *
 *  CODENAME: Paradise/Evidence
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import * as util from '../engine/util';

import { Item } from '../engine/item';

class Evidence extends Item {
    constructor(name, description, incriminates, location) {
        super(name, description);

        this.incriminates = incriminates;
        this.location = location;
        this.motiveBiases = {};
    }

    addMotiveBias(motiveName, value) {
        this.motiveBiases[motiveName] = value;
    }

    setLocation(location) {
        this.location = location;
    }
}

export { Evidence };