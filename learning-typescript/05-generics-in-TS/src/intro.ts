// Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer. How would you solve this problem?

function getFirstElement(arr : (string | number)[]) {
    return arr[0];
}

// console.log(getFirstElement(["Shoyeb", 1, 2, 3]).toUpperCase()); // Can't do this


// generics
function identity<T>(arg: T): T {
    return arg;
}

let out1 = identity<string>("Hii");
let out2 = identity<number>(123);

console.table({ out1, out2 });

// solution 

function getFirstElement2<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElement2<string>(["Hi", "heelo"]);
console.log(el.toUpperCase());
