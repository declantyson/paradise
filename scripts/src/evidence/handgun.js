/*
 *
 *  CODENAME: Paradise/Handgun
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Handgun extends MurderWeapon {
    constructor() {
        super('Handgun', 'a handgun, still warm from the recent shot');
    }
}

export { Handgun };