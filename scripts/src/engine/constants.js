/*
 *
 *  XL RPG/Constants
 *  XL Gaming/Declan Tyson
 *  v0.0.21
 *  06/02/2018
 *
 */

export const fps = 45;
export const actionTimeoutLimit = 2;
export const tileSize = 15;
export const tilesWide = 96;
export const tilesHigh = 54;

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

export const fonts = {
    large: '24px "Roboto Condensed"'
};

export const canvasProperties = {
    width: tileSize * tilesWide,
    height: tileSize * tilesHigh,
    centerPoint: {
        x: ((tileSize * tilesWide) / 2) - (tileSize / 2),
        y: ((tileSize * tilesHigh) / 2) - (tileSize / 2)
    }
};

export const interactionTextArea = {
    width: canvasProperties.width,
    height: canvasProperties.height / 3,
    background: colours.black,
    alpha: 0.4,
    badgeOffsetX: 20,
    badgeOffsetY: 40
};

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

export const personCount = 4;
export const inhabitanceSize = 2;
