/*
 *
 *  Paradise/Scene-Interaction
 *  Declan Tyson
 *  v0.0.65
 *  26/02/2018
 *
 */

import { Util } from './util';

import { Scene } from './scene';
import { interactionTextArea, colours } from '../constants';
import { settings, canvasProperties } from '../settings';

class Interaction extends Scene {
    constructor(person) {
        super();

        this.person = person;

        // calculate these values based on mood etc....;
        this.lines = this.person.lines || [];
        this.conversationOptions = this.person.conversationOptions || [];

        this.selectedConversationOption = 0;

        this.exiting = false;

        this.actions.up = this.previousOption.bind(this);
        this.actions.down = this.nextOption.bind(this);
        this.actions.action = this.sendResponse.bind(this);
        // this.actions.back = this.returnToWorldMap.bind(this);

        Util.log(`Entering interaction with ${this.person.name}`);
    }

    draw(ctx) {
        // World map should be overlaid
        this.worldMap.draw(ctx);
        this.person.currentPortrait.draw(ctx);

        if(this.exiting && !this.person.currentPortrait.exiting) {
            this.exit();
        }

        if(!this.game.keyHeld) this.keyHeld = false;

        this.drawConversationTextArea(ctx);
        this.drawBadge(ctx);
        this.drawConversation(ctx);
        this.drawOptions(ctx);
    }

    drawConversationTextArea(ctx) {
        ctx.rect(0, canvasProperties.height - interactionTextArea.height, interactionTextArea.width, interactionTextArea.height);
        ctx.fillStyle = interactionTextArea.background;
        ctx.globalAlpha = interactionTextArea.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    drawBadge(ctx) {
        ctx.font = settings.fonts.large;
        ctx.fillStyle = colours.white;
        ctx.fillText(this.person.name, interactionTextArea.badgeOffsetX, canvasProperties.height - interactionTextArea.height + interactionTextArea.badgeOffsetY);
    }

    drawConversation(ctx) {
        let y = canvasProperties.height - interactionTextArea.height + (interactionTextArea.badgeOffsetY) * 2;
        ctx.font = settings.fonts.small;
        ctx.fillStyle = colours.white;
        this.lines.forEach((line, index) => {
            ctx.fillText(line, interactionTextArea.badgeOffsetX, y + (index * interactionTextArea.lineHeight));
        });
    }

    drawOptions(ctx) {
        let y = canvasProperties.height - interactionTextArea.height + (interactionTextArea.optionsOffsetY) + (this.lines.length * interactionTextArea.lineHeight);
        ctx.font = settings.fonts.small;
        ctx.fillStyle = colours.white;
        this.conversationOptions.forEach((conversationOption, index) => {
            ctx.fillText(conversationOption.value, interactionTextArea.optionsOffsetX, y + (index * interactionTextArea.optionHeight));
            if(index === this.selectedConversationOption) {
                ctx.strokeStyle = colours.white;
                ctx.strokeRect(interactionTextArea.optionsOffsetX - interactionTextArea.optionHeight / 2,  y + (index * interactionTextArea.optionHeight) - (interactionTextArea.optionHeight / 1.5), interactionTextArea.width - interactionTextArea.optionsOffsetX, interactionTextArea.optionHeight);
            }
        });
    }

    nextOption() {
        if(this.keyHeld) return;

        if(this.selectedConversationOption < this.conversationOptions.length - 1) this.selectedConversationOption++;
        this.keyHeld = true;
    }

    previousOption() {
        if(this.keyHeld) return;

        if(this.selectedConversationOption > 0) this.selectedConversationOption--;
        this.keyHeld = true;
    }

    sendResponse() {
        if(this.keyHeld || this.person.currentPortrait.entering || this.person.currentPortrait.exiting) return;

        this.person.sendResponse(this.conversationOptions[this.selectedConversationOption], this);
        this.keyHeld = true;
    }

    returnToWorldMap() {
        if (!this.worldMap) return;
        this.exiting = true;
        this.person.currentPortrait.exiting = true;
        this.conversationOptions = [];
    }

    exit() {
        this.game.setScene(this.worldMap);
    }
}

export { Interaction };