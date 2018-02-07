/*
 *
 *  CODENAME: Paradise/Evidence/Medication
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import { Evidence } from "./evidence";

class Medication extends Evidence {
    constructor(incriminates, location) {
        super('Schizophrenia Medication', `medication prescribed to ${incriminates} for acute murderitis`, incriminates, location);

        this.addMotiveBias('Psychosis', 40);
        this.addMotiveBias('InheritanceScam', 10);
    }
}

export { Medication };