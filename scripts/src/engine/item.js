/*
 *
 *  XL RPG/Item
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import * as util from './util';
import { colours } from '../constants';

class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.colour = colours.black;
    }
}

export { Item };