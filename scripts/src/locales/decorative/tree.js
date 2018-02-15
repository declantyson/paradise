/*
 *
 *  Paradise/Decorative/Tree
 *  Declan Tyson
 *  v0.0.48
 *  15/02/2018
 *
 */

import { Decorative } from '../../engine/decorative';

class Tree extends Decorative {
    constructor(x, y) {
        super('Tree', 'a tropical palm tree', '/oob/Decorative/tree.png', x, y, [true, false, true]);
    }
}

export { Tree };