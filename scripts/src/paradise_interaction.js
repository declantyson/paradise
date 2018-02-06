/*
 *
 *  CODENAME: Paradise/Scene-Interaction
 *  XL Gaming/Declan Tyson
 *  v0.0.22
 *  06/02/2018
 *
 */

import * as util from './engine/util';

import { canvasProperties, interactionTextArea, fonts, colours, texts } from "./constants";
import { Interaction } from "./engine/interaction";

class ParadiseInteraction extends Interaction {
    constructor(person) {
        super(person);

        if(this.person.victim) {
            util.log(`${this.person.name} is dead.`);
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

    drawConversation(ctx) {

    }

    returnToWorldMap() {
        if(!this.worldMap) return;
        this.game.setScene(this.worldMap);
    }
}

export { ParadiseInteraction };