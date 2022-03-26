import { isValid } from "./script.js";

function allOptions() {
    return [
        new Step(1, 0),
        new Step(-1, 0),
        new Step(0, 1),
        new Step(0, -1),
    ]
}

class Step {
    constructor(dx, dy){
        this.dx = dx;
        this.dy = dy;
        this.tried = false;
    }
}

export default class Spot {
    constructor(i, j, spacing){
        this.i = i;
        this.j = j;
        this.x = this.i * spacing;
        this.y = this.j * spacing;
        this.options = allOptions();
        this.visited = false;
    }
    clear(){
        this.visited = false;
        this.options = allOptions();
    }

    nextSpot(grid) {
        let validOptions = [];
        for (const option of this.options) {
            let newX = this.i + option.dx;
            let newY = this.j + option.dy;
            if(isValid(newX, newY) && !option.tried){
                validOptions.push(option);
            }
        }

        if(validOptions.length > 0){
            let step = validOptions[Math.floor(Math.random() * validOptions.length)];
            step.tried = true;
            return grid[this.i + step.dx][this.j + step.dy]
            }
            return undefined; 
    }

    
}