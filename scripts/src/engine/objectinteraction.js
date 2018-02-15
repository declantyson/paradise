/*
 *
 *  Paradise/Scene-ObjectInteraction
 *  Declan Tyson
 *  v0.0.50
 *  15/02/2018
 *
 */

import { Util } from './util';

import { Scene } from './scene';
import { interactionTextArea, fonts, colours } from '../constants';
import { canvasProperties } from '../settings';

class ObjectInteraction extends Scene {
    constructor(decoration) {
        super();

        this.decoration = decoration;

        // calculate these values based on mood etc....;
        this.lines = this.decoration.lines || [];
        this.conversationOptions = this.decoration.conversationOptions || [];

        this.selectedConversationOption = 0;

        this.keyHeld = true;
        this.exiting = false;

        this.actions.up = this.previousOption.bind(this);
        this.actions.down = this.nextOption.bind(this);
        this.actions.action = this.sendResponse.bind(this);
    }

    draw(ctx) {
        // World map should be overlaid
        this.worldMap.draw(ctx);

        if(!this.game.keyHeld) this.keyHeld = false;

        this.drawConversationTextArea(ctx);
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

    drawConversation(ctx) {
        let y = canvasProperties.height - interactionTextArea.height + (interactionTextArea.badgeOffsetY) * 2;
        ctx.font = fonts.small;
        ctx.fillStyle = colours.white;
        this.lines.forEach((line, index) => {
            ctx.fillText(line, interactionTextArea.badgeOffsetX, y + (index * interactionTextArea.lineHeight));
        });
    }

    drawOptions(ctx) {
        let y = canvasProperties.height - interactionTextArea.height + (interactionTextArea.optionsOffsetY);
        ctx.font = fonts.small;
        ctx.fillStyle = colours.white;
        this.conversationOptions.forEach((conversationOption, index) => {
            ctx.fillText(conversationOption.value, interactionTextArea.optionsOffsetX, y + (index * interactionTextArea.optionHeight));
            if(index === this.selectedConversationOption) {
                ctx.strokeStyle = colours.white;
                ctx.strokeRect(interactionTextArea.optionsOffsetX - interactionTextArea.optionHeight / 2,  y + (index * interactionTextArea.optionHeight) - (interactionTextArea.optionHeight / 1.5), 250 + interactionTextArea.optionHeight, interactionTextArea.optionHeight);
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
        if(this.keyHeld) return;

        this.decoration.sendResponse(this.conversationOptions[this.selectedConversationOption], this);
        this.keyHeld = true;
    }

    returnToWorldMap() {
        this.worldMap.leavingInteraction = true;
        setTimeout(() => {
            this.worldMap.leavingInteraction = false;
        }, 250);
        this.game.setScene(this.worldMap);
    }
}

export { ObjectInteraction };