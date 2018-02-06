/*
 *
 *  CODENAME: Paradise/Motives/Inheritance Scam
 *  XL Gaming/Declan Tyson
 *  v0.0.24
 *  06/02/2018
 *
 */

import { Motive } from './motives';

class Passion extends Motive {
    constructor() {
        super('Crime of Passion', 'Driven by passion to kill a jealous partner or their concubine.', []);

        this.addRelationshipBias('Wife', 30);
        this.addRelationshipBias('Husband', 30);
        this.addRelationshipBias('The Other Woman', 40);
        this.addRelationshipBias('The Other Man', 40);
        this.addRelationshipBias('Mistress', 15);
        this.addRelationshipBias('Toyboy', 15);
    }
}

export { Passion };