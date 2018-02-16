/*
 *
 *  Paradise/Constants
 *  Declan Tyson
 *  v0.0.54
 *  16/02/2018
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
    fuschia: '#ff00ff',
    gold: '#ffc14b'
};

export const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
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

export const relationships = {
    acquaintance: "Acquaintace",
    wife: "Wife",
    husband: "Husband",
    sister: "Sister",
    brother: "Brother",
    mother: "Mother",
    father: "Father",
    daughter: "Daughter",
    son: "Son",
    friend: "Friend",
    closefriend: "Close Friend",
    roommate: "Roommate"
};

export const pairedRelationships = [
    relationships.wife, relationships.husband, relationships.roommate
];