/*
 *
 *  CODENAME: Paradise/Murder Weapon
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { Evidence } from './evidence';

class MurderWeapon extends Evidence {
    constructor(name, description, incriminates, locale) {
        super(name, description, incriminates, locale);
    }
}

export { MurderWeapon };