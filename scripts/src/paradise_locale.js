/*
 *
 *  CODENAME: Paradise/Locales/Base
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import * as util from './engine/util';

import { Interior, Locale } from "./engine/locale";

class ParadiseLocale extends Locale {
    constructor(player, people) {
        super(player, people);

        this.evidence = [];
    }
}

class ParadiseInterior extends Interior {
    constructor(player, people, inhabitance) {
        super(player, people, inhabitance);

        this.evidence = [];
    }
}

export { ParadiseInterior, ParadiseLocale };