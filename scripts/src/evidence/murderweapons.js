/*
 *
 *  CODENAME: Paradise/Murder Weapons
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import * as util from '../engine/util';

import { Knife } from './knife';
import { Spoon } from './spoon';
import { Handgun } from './handgun';

export let murderWeapons = {
    'Knife' : Knife,
    'Spoon' : Spoon,
    'Handgun' : Handgun
};

export const chooseMurderWeapon = () => {
    let weapon = util.pickRandomProperty(murderWeapons);
    util.log(`The murder weapon is a ${weapon}.`);
    return weapon;
};