/*
 *
 *  XL RPG/Util
 *  XL Gaming/Declan Tyson
 *  v0.0.19
 *  05/02/2018
 *
 */

export const pickRandomProperty = (obj)  => {
    let result,
        count = 0;

    for (let prop in obj) {
        if (Math.random() < 1 / ++count) result = prop;
    }
    return result;
};

export const pickRandomIndex = (arr, indexOnly = false)  => {
    let index = Math.floor(Math.random() * (arr.length-1));
    if(indexOnly) return index;
    return arr[index];
};

export const log = (str) => {
    document.getElementById('log').innerHTML += `\n\t${str}`;
};
