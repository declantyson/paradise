/*
 *
 *  CODENAME: Paradise/Motives/Inheritance Scam
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

import { Motive } from './motive';

class InheritanceScam extends Motive {
    constructor() {
        super('Inheritance Scam', 'Removal of a spouse or family member in order to obtain part or all of their inheritance', []);

        this.addRelationshipBias('Wife', 20);
        this.addRelationshipBias('Husband', 20);
        this.addRelationshipBias('Brother', 25);
        this.addRelationshipBias('Sister', 25);
        this.addRelationshipBias('Mother', 30);
        this.addRelationshipBias('Father', 30);
    }
}

export { InheritanceScam };