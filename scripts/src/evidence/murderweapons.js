/*
 *
 *  CODENAME: Paradise/Murder Weapons
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

import { Knife } from './knife';
import { Spoon } from './spoon';
import { Handgun } from './handgun';
import * as util from "../engine/util";
import {dieRoll} from "../engine/util";

export let murderWeapons = {
    'Knife' : Knife,
    'Spoon' : Spoon,
    'Handgun' : Handgun
};