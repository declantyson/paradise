/*
 *
 *  Paradise/Decorative/Rug
 *  Declan Tyson
 *  v0.0.49
 *  15/02/2018
 *
 */

import { Decorative } from '../../engine/decorative';

class Rug extends Decorative {
  constructor(x, y) {
    super('Rug', 'a fancy rug', '/oob/Decorative/rug.png', x, y, [], false);
  }
}

export { Rug };
