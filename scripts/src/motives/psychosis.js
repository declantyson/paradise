/*
 *
 *  CODENAME: Paradise/Motives/Inheritance Scam
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

import { Motive } from './motive';

class Psychosis extends Motive {
    constructor() {
        super('Psychotic Break', 'A temporary loss of sense leading to murder.', []);

        this.addRelationshipBias('Wife', 20);
        this.addRelationshipBias('Husband', 20);
        this.addRelationshipBias('Acquaintance', 20);
        this.addRelationshipBias('Friend', 20);
        this.addRelationshipBias('Brother', 20);
        this.addRelationshipBias('Sister', 20);
        this.addRelationshipBias('Mother', 20);
        this.addRelationshipBias('Father', 20);
        this.addRelationshipBias('Son', 20);
        this.addRelationshipBias('Daughter', 20);
        this.addRelationshipBias('The Other Woman', 20);
        this.addRelationshipBias('The Other Man', 20);
        this.addRelationshipBias('Mistress', 20);
        this.addRelationshipBias('Toyboy', 20);
        this.addRelationshipBias('Student', 20);
        this.addRelationshipBias('Teacher', 20);
    }
}

export { Psychosis };