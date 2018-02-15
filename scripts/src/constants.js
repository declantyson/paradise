/*
 *
 *  Paradise/Constants
 *  Declan Tyson
 *  v0.0.48
 *  15/02/2018
 *
 */

import { canvasProperties } from './settings';

export const colours = {
    black : '#000000',
    white: '#FFFFFF',
    green: '#00AA00',
    blue: '#0000AA',
    brown: '#4f1f0b',
    darkbrown: '#291006',
    grey: '#cdcdcd',
    red: '#ff0000',
    fuschia: '#ff00ff'
};

export const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

export const fonts = {
    large: '24px "Roboto Condensed"',
    small: '16px "Roboto"',
    death: '24px "Permanent Marker"'
};

export const interactionTextArea = {
    width: canvasProperties.width,
    height: canvasProperties.height / 3,
    background: colours.black,
    alpha: 0.4,
    badgeOffsetX: 20,
    badgeOffsetY: 40,
    optionsOffsetX: canvasProperties.width - 300,
    optionsOffsetY: 40,
    optionHeight: 36,
    lineHeight: 18
};

export const genders = {
    male   : 'M',
    female : 'F',
    alien  : 'A'
};

export const pronouns = {
    M   : 'him',
    F   : 'her',
    A   : 'xlem'
};

export const posessivePronouns = {
    M   : 'his',
    F   : 'her',
    A   : 'xleir'
};
