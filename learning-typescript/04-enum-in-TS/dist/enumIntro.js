"use strict";
var Directions;
(function (Directions) {
    Directions[Directions["up"] = 0] = "up";
    Directions[Directions["down"] = 1] = "down";
    Directions[Directions["left"] = 2] = "left";
    Directions[Directions["right"] = 3] = "right";
})(Directions || (Directions = {}));
;
function fs(key) {
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
var Direction2;
(function (Direction2) {
    Direction2["up"] = "up";
    Direction2["down"] = "down";
    Direction2["right"] = "right";
    Direction2["left"] = "left";
})(Direction2 || (Direction2 = {}));
console.log(Direction2); // will print object
var Direction3;
(function (Direction3) {
    Direction3[Direction3["up"] = 10] = "up";
    Direction3[Direction3["down"] = 20] = "down";
    Direction3[Direction3["left"] = 21] = "left";
    Direction3[Direction3["right"] = 22] = "right";
})(Direction3 || (Direction3 = {}));
console.log(Direction3); // will print object
var Direction4;
(function (Direction4) {
    Direction4[Direction4["up"] = 1] = "up";
    Direction4[Direction4["down"] = 2] = "down";
    Direction4[Direction4["left"] = 3] = "left";
    Direction4[Direction4["right"] = 4] = "right";
})(Direction4 || (Direction4 = {}));
console.log(Direction4.up); // will print object
