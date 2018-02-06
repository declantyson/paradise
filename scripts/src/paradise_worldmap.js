/*
 *
 *  CODENAME: Paradise/World Map
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import { WorldMap } from "./engine/worldmap";
import { people } from './people/availablepeople';
import { ParadiseInteraction } from "./paradise_interaction";

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

                this.presentPeople.push(person);
            }
        });
    }

    startInteraction(person) {
        let interaction = new ParadiseInteraction(person);
        interaction.worldMap = this;
        this.game.setScene(interaction);
    }
}

export { ParadiseWorldMap };