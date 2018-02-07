/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

import { Village } from './village';
import { Islands } from './islands';
import { GroveStreet1 } from './interiors/1grovestreet';
import { GroveStreet2 } from './interiors/2grovestreet';
import { GroveStreet3 } from './interiors/3grovestreet';
import { GroveStreet4 } from './interiors/4grovestreet';
import { TownHall } from "./interiors/townhall";

export const startingMaps = {
    'Village' : Village,
    'Islands' : Islands
};

export const locales = {
    'Village' : Village,
    'Islands' : Islands,
    'GroveStreet1' : GroveStreet1,
    'GroveStreet2' : GroveStreet2,
    'GroveStreet3' : GroveStreet3,
    'GroveStreet4' : GroveStreet4,
    'TownHall' : TownHall
};