/*
 *
 *  CODENAME: Paradise/Handgun
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Handgun extends MurderWeapon {
    constructor(incriminates, location) {
        super('Handgun', 'a handgun, still warm from the recent shot', incriminates, location);
    }
}

export { Handgun };