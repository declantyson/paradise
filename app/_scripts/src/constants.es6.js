/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.11
 *  13/11/2017
 *
 */

export const colours = {
    black : "#000000",
    white: "#FFFFFF",
    green: "#00AA00",
    blue: "#0000AA",
    brown: "#4f1f0b",
    darkbrown: "#291006",
    grey: "#cdcdcd"
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


export const personCount = 4;
export const genders = {
    male   : "M",
    female : "F",
    alien  : "A"
};
export const inhabitanceSize = 2;
