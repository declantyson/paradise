/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
 *
 */

class Locale {
    constructor(player) {
        this.player = player;
        this.entryPoints = {};
    }

    initialise(width, height) {
        let map = [],
            enc = [];
        for(let i = 0; i < width; i++) {
            map.push([]);
            enc.push([]);
            for(let j = 0; j < height; j++) {
                map[i].push(["Blank"]);
                enc[i].push(false);
            }
        }

        this.map = map;
        this.encounters = enc;
        this.width = width;
        this.height = height;
    }

    terrainPaint(startX, startY, width, height, terrain) {
        for(let x = startX; x < startX + width; x++) {
            for(let y = startY; y < startY + height; y++) {
                this.map[x][y] = terrain;
            }
        }
    }

    randomEncounterPatch(startX, startY, width, height, rate, enemies) {
        for(let x = startX; x < startX + width; x++) {
            for (let y = startY; y < startY + height; y++) {
                this.encounters[x][y] = {
                    rate: rate,
                    enemies: enemies
                };
            }
        }
    }

    enterLocaleAt(entryPoint) {
        this.player.setPlacement(this.entryPoints[entryPoint].x, this.entryPoints[entryPoint].y);
    }
}

export { Locale };
