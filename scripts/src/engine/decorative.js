/*
 *
 *  Paradise/Decorative
 *  Declan Tyson
 *  v0.0.48
 *  15/02/2018
 *
 */

import { colours } from '../constants';
import {settings, tileStep} from '../settings';

class Decorative {
    constructor(name, description, src, x, y, passMap = []) {
        this.name = name;
        this.description = description;
        let image = new Image();
        image.src = src;
        this.image = image;
        this.items = [];
        this.colour = colours.red;
        this.passMap = passMap;

        if(x) this.x = x;
        if(y) this.y = y;
    }

    addItem(item) {
        this.items.push(item);
    }

    draw(ctx, player, mapOffsetX, mapOffsetY, map) {
        let decorationX =  this.x * settings.terrain.tileSize - mapOffsetX,
            decorationY =  this.y * settings.terrain.tileSize - mapOffsetY,
            offsetX = player.stepX * tileStep,
            offsetY = player.stepY * tileStep,
            height = this.image.naturalHeight; // we draw this from the bottom

        ctx.drawImage(this.image, decorationX - offsetX, decorationY - offsetY - height + settings.terrain.tileSize);

        for(let i = 0; i < this.passMap.length; i++) {
            map[this.x + i][this.y].passable = this.passMap[i];

            if(window.debug && !this.passMap[i]) {
                let debugX =  (this.x + i) * settings.terrain.tileSize - mapOffsetX;

                ctx.beginPath();
                ctx.fillStyle = this.colour;
                ctx.strokeStyle = this.colour;
                ctx.rect(debugX - offsetX, decorationY - offsetY, settings.terrain.tileSize, settings.terrain.tileSize);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}

export { Decorative };
