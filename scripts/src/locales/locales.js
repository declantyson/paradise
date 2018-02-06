/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

// Locales

import * as util from '../engine/util';

import { Village } from './village';
import { Islands } from './islands';
import { GroveStreet1 } from './interiors/1grovestreet';
import { GroveStreet2 } from './interiors/2grovestreet';
import { GroveStreet3 } from './interiors/3grovestreet';
import { GroveStreet4 } from './interiors/4grovestreet';

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
    'GroveStreet4' : GroveStreet4
};

export const chooseStartingMap = () => {
    let locale = util.pickRandomProperty(startingMaps);
    util.log('Choosing starting map...');
    util.log(`Map is ${locale}.`);
    return locale;
};