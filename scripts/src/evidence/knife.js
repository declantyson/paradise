/*
 *
 *  CODENAME: Paradise/Knife
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Knife extends MurderWeapon {
    constructor(incriminates, location) {
        super('Knife', 'a blood-stained kitchen knife', incriminates, location);
    }
}

export { Knife };