import { Card } from "./components/Card"
import { AddCard } from "./components/AddCard";
import { useState } from "react";
import { AllCards } from "./components/AllCards";

const user = {
  name : "Shoyeb Ansari",
  description: "A TA in the 100xDevs Cohort 2.0",
  interests: ["Ionic", "Open Source", "App Dev"],
  socialHandles: [
    {
      url: "https://linkedin.com/in/shoyebansari45/",
      name: "linkedin"
    },
    {
      url: "https://github.com/Shoyeb45/",
      name: "github"
    },
    {
      url: "dfs",
      name: "twitter"
    },
    {
      url: "facebook.com",
      name: "facebook"
    }, 
    {
      url: "ig,com",
      name: "instagram"
    }
  ]
}
function App() {
  const [cards, setCards] = useState([user]);
  return (
    <>

    {/* Component of adding card */}
    <AddCard cards={cards} setCards={setCards}></AddCard>

    {/* Show all cards */}
      <AllCards cards={cards}></AllCards>
    </>
  )
}

export default App
