// import axios from "axios";

var btn = document.querySelector(".btn");

btn.addEventListener("click", (event) => {
    request();
})

function request() {
    fetch("https://backend-sj5a.onrender.com/possibleDomains")
        .then(response => response.json())
        .then((data) => {
            
            let h2 = document.createElement("h2");

            h2.innerHTML = `Domains : ${data.length}`
            btn.after(h2);

            const itemList = document.createElement("ul");
            h2.after(itemList);

            for (let i = 0; i < data.length; i++) {
                const li = document.createElement("li");
                li.textContent = data[i].domain;
                itemList.appendChild(li);
            }
            console.log(data);
            console.log(h2);
            
            const p = document.createElement("p");
            p.innerHTML = 'All data are fetched from server with url : <a href="https://backend-sj5a.onrender.com/possibleDomains">Here</a>';            
            itemList.appendChild(p);
        }
    )
    .catch((error) => {
            console.error("Error fetching data", error);   
        }
    )
}