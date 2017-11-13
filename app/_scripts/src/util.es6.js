/*
 *
 *  XL RPG/Util
 *  XL Gaming/Declan Tyson
 *  v0.0.9
 *  13/11/2017
 *
 */

export function pickRandomProperty(obj) {
    let result,
        count = 0;

    for (let prop in obj) {
        if (Math.random() < 1 / ++count) result = prop;
    }
    return result;
}
