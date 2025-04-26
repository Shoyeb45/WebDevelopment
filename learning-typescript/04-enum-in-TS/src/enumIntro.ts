enum Directions {
    up,
    down,
    left,
    right
};

function fs(key: Directions) {
    if (key === Directions.up) {
        console.log("up");
        console.log(Directions.up);
    }
    if (key === Directions.down) {
        console.log("down");
        console.log(Directions.down);
    }
    if (key === Directions.left) {
        console.log("left");
        console.log(Directions.left);
    }
    if (key === Directions.right) {
        console.log("up");
        console.log(Directions.right);
    }
}


enum Direction2 {
    up = "up",
    down = "down",
    right = "right",
    left = "left",
}

console.log(Direction2);  // will print object

enum Direction3 {
    up = 10,
    down = 20,
    left,
    right,
}
console.log(Direction3);  // will print object


enum Direction4 {
    up = 1,
    down,
    left,
    right,
}
console.log(Direction4.up);  // will print object



