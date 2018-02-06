/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.20
 *  05/02/2018
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

export const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

export const tileSize = 10;

export const tilesWide = 64,
      tilesHigh = 36;

export const canvasProperties = {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    centerPoint: {
        x: ((tileSize * tilesWide) / 2) - (tileSize / 2),
        y: ((tileSize * tilesHigh) / 2) - (tileSize / 2)
    }
};

export const fps = 45;
export const actionTimeoutLimit = 2;

export const personCount = 4;
export const genders = {
    male   : "M",
    female : "F",
    alien  : "A"
};
export const pronouns = {
    M   : "his",
    F   : "her",
    A   : "xleir"
};
export const inhabitanceSize = 2;