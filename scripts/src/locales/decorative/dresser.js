/*
 *
 *  Paradise/Decorative/Dresser
 *  Declan Tyson
 *  v0.0.49
 *  15/02/2018
 *
 */

import { Decorative } from '../../engine/decorative';

class Dresser extends Decorative {
    constructor(x, y) {
        super('Dresser', 'a fancy dresser', '/oob/Decorative/dresser.png', x, y, [false, false]);
    }
}

export { Dresser };