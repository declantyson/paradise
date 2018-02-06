/*
 *
 *  CODENAME: Paradise/Handgun
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Handgun extends MurderWeapon {
    constructor(incriminates, locale) {
        super('Handgun', 'a handgun, still warm from the recent shot', incriminates, locale);
    }
}

export { Handgun };