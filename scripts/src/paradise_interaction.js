/*
 *
 *  CODENAME: Paradise/Scene-Interaction
 *  XL Gaming/Declan Tyson
 *  v0.0.26
 *  07/02/2018
 *
 */

import * as util from './engine/util';

import { canvasProperties, interactionTextArea, fonts, colours, texts, pronouns } from './constants';
import { Interaction } from './engine/interaction';

class ParadiseInteraction extends Interaction {
    constructor(person, game) {
        super(person);

        this.game = game;

        if(this.person.victim) {
            let lines = [],
                person = this.person,
                weapon = this.game.weapon;

            lines.push(`${person.name} is dead.`);
            person.evidence.forEach((evidence) => {
                lines.push(`Lying next to ${pronouns[person.gender]} is ${evidence.description}.`);
            });

            for(let i = 0; i < lines.length; i++) this.lines.push(lines[i]);
        }
    }

    drawBadge(ctx) {
        super.drawBadge(ctx);

        if(this.person.victim) {
            ctx.font = fonts.death;
            ctx.fillStyle = colours.red;
            ctx.fillText(texts.dead, interactionTextArea.badgeOffsetX, canvasProperties.height - interactionTextArea.height + (interactionTextArea.badgeOffsetY) * 2);
        }
    }

    returnToWorldMap() {
        if(!this.worldMap) return;
        this.game.setScene(this.worldMap);
    }
}

export { ParadiseInteraction };