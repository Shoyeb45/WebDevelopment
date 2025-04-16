import { Card } from "./Card"
import "./../styles/cards.css"
export function AllCards({ cards }) {
    return (
        <div className="cards">
            {cards.map((card) => {
                return <Card user={card} key={card.id}></Card>
            })}
        </div>
    )
}