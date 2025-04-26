const x: number = 121312;
console.log(x);


// problem-1
function greet(name: string) {
    console.log(`Hello ${name}`);
}

greet("Shoyeb");

// problem-2: sum function
function sum(a: number, b: number): number {
    return a + b;
}

console.log(sum(12, 23));


// problem-3: adult or not
function isAdult(age: number): boolean {
    return age >= 18;
}


console.log(isAdult(23));

// problem-4: delayed function execution

const fn = () => {
    console.log("This function will execute after 1 seconds");
}

async function delayedCall(fn: () => void): Promise<void> {
    await new Promise(() => setTimeout(fn, 1000));
}
delayedCall(fn);



function fn2(a) {
    console.log(a);
}

fn2(90000)


