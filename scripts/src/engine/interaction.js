/*
 *
 *  Paradise/Scene-Interaction
 *  Declan Tyson
 *  v0.0.43
 *  13/02/2018
 *
 */

import { Util } from './util';

import { Scene } from './scene';
import { interactionTextArea, fonts, colours } from '../constants';
import { canvasProperties } from '../settings';
import { Portrait } from './portrait';

class Interaction extends Scene {
    constructor(person) {
        super();

        this.lines = [];
        this.person = person;
        this.actions.back = this.returnToWorldMap.bind(this);
        this.exiting = false;

        this.portrait = new Portrait('/oob/test_portrait.png', this);  // calculate the portrait based on mood etc....;

        Util.log(`Entering interaction with ${this.person.name}`);
    }

    draw(ctx) {
        // World map should be overlaid
        this.worldMap.draw(ctx);
        this.portrait.draw(ctx);
        if(this.exiting && !this.portrait.exiting) {
            this.exit();
        }

        this.drawConversationTextArea(ctx);
        this.drawBadge(ctx);
        this.drawConversation(ctx);
    }

    drawConversationTextArea(ctx) {
        ctx.rect(0, canvasProperties.height - interactionTextArea.height, interactionTextArea.width, interactionTextArea.height);
        ctx.fillStyle = interactionTextArea.colour;
        ctx.globalAlpha = interactionTextArea.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    drawBadge(ctx) {
        ctx.font = fonts.large;
        ctx.fillStyle = colours.white;
        ctx.fillText(this.person.name, interactionTextArea.badgeOffsetX, canvasProperties.height - interactionTextArea.height + interactionTextArea.badgeOffsetY);
    }

    drawConversation(ctx) {
        let y = canvasProperties.height - interactionTextArea.height + (interactionTextArea.badgeOffsetY) * 3;
        ctx.font = fonts.small;
        ctx.fillStyle = colours.white;
        this.lines.forEach((line, index) => {
            ctx.fillText(line, interactionTextArea.badgeOffsetX, y + (index * interactionTextArea.lineHeight));
        });
    }

    returnToWorldMap() {
        if (!this.worldMap) return;
        this.exiting = true;
        this.portrait.exiting = true;
    }

    exit() {
        this.game.setScene(this.worldMap);
    }
}

export { Interaction };