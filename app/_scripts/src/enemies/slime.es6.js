/*
 *
 *  XL RPG/Enemy/Slime
 *  XL Gaming/Declan Tyson
 *  v0.0.8
 *  23/12/2016
 *
 */

import { Enemy } from "./enemy";

export default class Slime extends Enemy {
    constructor() {
        super("Slime", 10, 4, 3, 4, 1);
    }
};