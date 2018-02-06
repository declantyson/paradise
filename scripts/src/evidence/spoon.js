/*
 *
 *  CODENAME: Paradise/Spoon
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Spoon extends MurderWeapon {
    constructor(incriminates, locale) {
        super('Spoon', 'a jagged rusty spoon', incriminates, locale);
    }
}

export { Spoon };