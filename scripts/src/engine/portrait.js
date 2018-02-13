/*
 *
 *  Paradise/Portrait
 *  Declan Tyson
 *  v0.0.43
 *  13/02/2018
 *
 */

import { canvasProperties, portraitWidth } from '../settings';
import {interactionTextArea} from '../constants';

class Portrait {
    constructor(imageSrc, interaction) {
        let image = new Image();
        image.src = imageSrc;
        this.image = image;
        this.entering = true;
        this.exiting = false;
        this.frame = 0;
        this.frameIncrement = 1;
        this.maxFrames = 30;
        this.interaction = interaction;
    }

    draw(ctx) {
        if(this.entering) this.enter();
        if(this.exiting) this.exit();

        ctx.globalAlpha = this.frame / this.maxFrames;
        ctx.drawImage(this.image, 0, 0, canvasProperties.width, canvasProperties.height, canvasProperties.width - (this.frame * ((canvasProperties.width / 2) / this.maxFrames)), 0, canvasProperties.width, canvasProperties.height);
        ctx.globalAlpha = 1;
    }

    enter() {
        if(this.frame < this.maxFrames) {
            this.frame += this.frameIncrement;
        } else {
            this.entering = false;
        }
    }

    exit() {
        if(this.frame > 0) {
            this.frame -= this.frameIncrement;
        } else {
            this.exiting = false;
        }
    }
}

export { Portrait };