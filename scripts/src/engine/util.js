/*
 *
 *  Paradise/Util
 *  Declan Tyson
 *  v0.0.23
 *  06/02/2018
 *
 */

export const dieRoll = (sides)  => {
    let result = Math.floor(Math.random() * (sides));
    return result;
};

export const pickRandomProperty = (obj)  => {
    let result,
        count = 0;

    for (let prop in obj) {
        if (Math.random() < 1 / ++count) result = prop;
    }
    return result;
};

export const log = (str) => {
    let log = document.getElementById('log');
    log.innerHTML += `${str}<hr/>`;
    log.scrollTop = log.scrollHeight;
};

export const clearLog = () => {
    document.getElementById('log').innerHTML = '';
};