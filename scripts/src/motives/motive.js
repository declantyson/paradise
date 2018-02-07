/*
 *
 *  CODENAME: Paradise/Motive
 *  XL Gaming/Declan Tyson
 *  v0.0.25
 *  07/02/2018
 *
 */

class Motive {
    constructor(name, description, evidence) {
        this.name = name;
        this.description = description;
        this.evidence = evidence;

        this.relationshipBiases = {};
    }

    addRelationshipBias(relationshipName, value) {
        this.relationshipBiases[relationshipName] = value;
    }
}

export { Motive };