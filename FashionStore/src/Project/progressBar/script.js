arr = document.querySelectorAll("button");
meteres = document.querySelectorAll("meter")
let ratings = [0, 0, 0, 0 , 0];

function doOnClick(x, arr, ratings) {
    arr[x].onclick = () => {
    ratings[4 - x]++;
    let sum = 0;
    for(let i = 0; i < ratings.length; i++) {
        sum += ratings[i];
    }
    for(let i = 0; i < ratings.length; i++) {
        meteres[i].setAttribute("value", (ratings[i] * sum) / 100)
    }
    };
}

for(let i = 0; i < 5; i++) {
    doOnClick(i, arr, ratings, meteres);
}


