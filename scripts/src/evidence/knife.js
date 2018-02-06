/*
 *
 *  CODENAME: Paradise/Knife
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Knife extends MurderWeapon {
    constructor(incriminates, locale) {
        super('Knife', 'a blood-stained kitchen knife', incriminates, locale);
    }
}

export { Knife };