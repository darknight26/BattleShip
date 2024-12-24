import Ship from "./ship";
import { gameboard } from "./gameboard";

export default class Player{
    constructor(name,type = "player"){
        this.name = name;
        this.gameboard = new gameboard(8);
        this.ships = [];
        this.type = type;
    }
}