let num: number[] = [];

let iter = 123;

while (iter--) {
    num.push((100 * Math.random()));
}

console.log(num);

let mx = Number.NEGATIVE_INFINITY;

num.forEach(x => { mx = Math.max(mx, x) });

console.table(mx);

