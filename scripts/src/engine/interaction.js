/*
 *
 *  XL RPG/Scene-Interaction
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  06/02/2018
 *
 */

import * as util from './util';

import { Scene } from "./scene";
import { canvasProperties, interactionTextArea, fonts, colours } from "../constants";

class Interaction extends Scene {
    constructor(person) {
        super();

        this.person = person;
        this.actions.back = this.returnToWorldMap.bind(this);

        util.log(`Entering interaction with ${this.person.name}`);
    }

    draw(ctx) {
        this.drawConversationTextArea(ctx);
        this.drawBadge(ctx);
    }

    drawConversationTextArea(ctx) {
        ctx.save();
        ctx.rect(0, canvasProperties.height - interactionTextArea.height, interactionTextArea.width, interactionTextArea.height);
        ctx.fillStyle = interactionTextArea.colour;
        ctx.globalAlpha = interactionTextArea.alpha;
        ctx.fill();
        ctx.restore();
    }

    drawBadge(ctx) {
        ctx.font = fonts.large;
        ctx.fillStyle = colours.white;
        ctx.fillText(this.person.name, interactionTextArea.badgeOffsetX, canvasProperties.height - interactionTextArea.height + interactionTextArea.badgeOffsetY);
    }

    drawConversation(ctx) {

    }

    returnToWorldMap() {
        if(!this.worldMap) return;
        this.game.setScene(this.worldMap);
    }
}

export { Interaction };