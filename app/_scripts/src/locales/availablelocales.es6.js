/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.14
 *  15/11/2016
 *
 */

// Locales

import * as util from '../util';

import { Village } from './village';
import { Islands } from './islands';
import { GroveStreet1 } from './interiors/1grovestreet';

export const startingMaps = {
    "Village" : Village,
    "Islands" : Islands,
};

export const locales = {
    "Village" : Village,
    "Islands" : Islands,
    "GroveStreet1" : GroveStreet1
};

export const chooseStartingMap = () => {
    let locale = util.pickRandomProperty(startingMaps);
    util.log('Choosing starting map...');
    util.log(`Map is ${locale}.`);
    return locale;
};

