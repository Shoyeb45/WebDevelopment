// import axios from "axios";

fetch("http://localhost:4000/possibleDomains")
    .then(response => response.json())
    .then((data) => {
        let h2 = document.querySelector("h2");
        h2.innerHTML = `Basic domains : ${data.length}`
        const itemList = document.getElementById("list");
        for (let i = 0; i < data.length; i++) {
            const li = document.createElement("li");
            li.textContent = data[i].domain;
            itemList.appendChild(li);
        }
        console.log(data);
        console.log(h2);
        
        const p = document.createElement("p");
        p.innerHTML = "All data are fetched from server with url : <a>https://localhost:4000/possibleDomains</a> ";
        itemList.appendChild(p);
    }
)
.catch((error) => {
        console.error("Error fetching data", error);
        
    }
)