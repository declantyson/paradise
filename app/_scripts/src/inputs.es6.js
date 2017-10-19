/*
 *
 *  XL RPG/Inputs
 *  XL Gaming/Declan Tyson
 *  v0.0.5
 *  23/12/2016
 *
 */

const actions = {
    38 :    "up",
    40 :    "down",
    37 :    "left",
    39 :    "right",
    32 :    "action"
};

window.addEventListener("keydown", (e) => {
    if(!actions[e.keyCode] || !window.game) return;
    window.game.sendInput(actions[e.keyCode]);
});

window.addEventListener("keyup", (e) => {
    if(!window.game) return;
    window.game.sendInput(null);
});