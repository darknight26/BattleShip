export default class Ship{
    constructor(idx,hits,st_coor,en_coor){
        this.idx = idx;
        this.hits = hits;
        this.sunk = false;
        this.st_coor = st_coor;
        this.en_coor = en_coor;
        this.orientation = "horizontal"
        this.len = Math.max(Math.abs(this.en_coor[0] - this.st_coor[0]), Math.abs(this.en_coor[1] - this.st_coor[1])) + 1
    }
    isHit(){
        if(this.sunk==true)
            return;
        this.hits++;
        if(this.hits>=this.len){
            this.sunk = true;
        }
        return;
    }
    isSunk(){
        return this.sunk;
    }
}