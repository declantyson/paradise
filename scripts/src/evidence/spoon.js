/*
 *
 *  CODENAME: Paradise/Spoon
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Spoon extends MurderWeapon {
    constructor(incriminates, location) {
        super('Spoon', 'a jagged rusty spoon', incriminates, location);
    }
}

export { Spoon };