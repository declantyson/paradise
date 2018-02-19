/*
 *
 *  Paradise/Constants
 *  Declan Tyson
 *  v0.0.60
 *  19/02/2018
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
    width: canvasProperties.width / 2,
    height: canvasProperties.height,
    background: colours.black,
    alpha: 0.4,
    badgeOffsetX: 20,
    badgeOffsetY: 40,
    optionsOffsetX: 40,
    optionsOffsetY: 100,
    optionHeight: 36,
    lineHeight: 22
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