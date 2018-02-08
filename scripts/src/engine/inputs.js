/*
 *
 *  Paradise/Inputs
 *  Declan Tyson
 *  v0.0.21
 *  06/02/2018
 *
 */

const actions = {
    38 :    'up',
    40 :    'down',
    37 :    'left',
    39 :    'right',
    32 :    'action',
    27 :    'back'
};

window.addEventListener('keydown', (e) => {
    if(!actions[e.keyCode] || !window.game) return;
    window.game.sendInput(actions[e.keyCode]);
});

window.addEventListener('keyup', (e) => {
    if(!window.game) return;
    window.game.sendInput(null);
});