/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.7
 *  23/12/2016
 *
 */

export const colours = {
    black : "#000000",
    white: "#FFFFFF",
    green: "#00AA00",
    blue: "#0000AA"
};

export const tileSize = 20;

export const tilesWide = 40,
      tilesHigh = 30;

export const canvasProperties = {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    centerPoint: {
        x: ((tileSize * tilesWide) / 2) - (tileSize / 2),
        y: ((tileSize * tilesHigh) / 2) - (tileSize / 2)
    }
};

export const fps = 60;
export const actionTimeoutLimit = 2;
