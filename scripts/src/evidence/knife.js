/*
 *
 *  CODENAME: Paradise/Knife
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import { MurderWeapon } from './murderweapon';

class Knife extends MurderWeapon {
    constructor() {
        super('Knife', 'a blood-stained kitchen knife');
    }
}

export { Knife };