/*
 *
 *  CODENAME: Paradise/World Map
 *  XL Gaming/Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

import { WorldMap } from "./engine/worldmap";
import { people } from './people/people';
import { ParadiseInteraction } from "./paradise_interaction";
import * as util from "./engine/util";

class ParadiseWorldMap extends WorldMap {
    constructor(player) {
        super(player);
    }

    spawnPeople() {
        if(this.locale.inhabitance === undefined) return;

        this.locale.inhabitance.inhabitants.forEach((inhabitant, index) => {
            let spawnPoint = this.locale.spawnPoints[index];
            if(spawnPoint !== undefined) {
                let person = new people[inhabitant]();
                person.x = spawnPoint.x;
                person.y = spawnPoint.y;

                if(person.name === this.game.victim) person.victim = true;
                if(person.name === this.game.murderer) person.murderer = true;

                this.plantEvidence(person);

                this.presentPeople.push(person);
            }
        });

        this.plantEvidence(this.locale);
    }

    startInteraction(person) {
        let interaction = new ParadiseInteraction(person, this.game);
        interaction.worldMap = this;
        this.game.setScene(interaction);
    }

    plantEvidence(location) {
        this.game.evidence.forEach((evidence) => {
             if(location.id === evidence.location) {
                 location.evidence.push(evidence);
                 util.log(`${evidence.name} is hidden here!`);
             }
        });
    }
}

export { ParadiseWorldMap };