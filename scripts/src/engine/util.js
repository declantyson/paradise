/*
 *
 *  Paradise/Util
 *  Declan Tyson
 *  v0.0.53
 *  16/02/2018
 *
 */

class Util {
  static dieRoll(sides) {
    return Math.floor(Math.random() * sides);
  }

  static pickRandomProperty(obj) {
    let result,
      count = 0;

    for (let prop in obj) {
      if (Math.random() < 1 / ++count) result = prop;
    }
    return result;
  }

  static log(str) {
    let log = document.getElementById('log');
    log.innerHTML += `${str}<hr/>`;
    log.scrollTop = log.scrollHeight;
  }

  static clearLog() {
    document.getElementById('log').innerHTML = '';
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export { Util };
