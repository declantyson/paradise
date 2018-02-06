/*
 *
 *  CODENAME: Paradise/Evidence
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import * as util from "../engine/util";

import { Item } from '../engine/item';

class Evidence extends Item {
    constructor(name, description, incriminates, location) {
        super(name, description);

        this.incriminates = incriminates;
        this.location = location;
    }
}

export { Evidence };