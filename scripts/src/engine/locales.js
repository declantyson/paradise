/*
 *
 *  XL RPG/Locales
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  06/02/2018
 *
 */

export const chooseStartingMap = () => {
    let locale = util.pickRandomProperty(startingMaps);
    util.log('Choosing starting map...');
    util.log(`Map is ${locale}.`);
    return locale;
};

