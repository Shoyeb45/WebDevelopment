
var btn = document.getElementById("btn");
console.log(btn);

btn.addEventListener("click", (event) => {
        console.log(event);
        request();
    }
);

function request() {
    axios.get("http://localhost:3000/test")
        .then(  
            (data) => {
                const h1 = document.createElement("h1");
                console.log(data.data);
                h1.innerHTML = data.data;
                btn.after(h1);   
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }   
        );
}