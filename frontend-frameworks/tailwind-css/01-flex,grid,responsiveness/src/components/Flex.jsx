export function Flex() {
    return (
        <div className="flex justify-around ">
            <div style={{backgroundColor: "green"}} className="p-4">Green</div>
            <div style={{backgroundColor: "Red"}} className="p-4">Red</div>
            <div style={{backgroundColor: "Yellow"}} className="p-4">Yellow</div>
            <div style={{backgroundColor: "Indigo"}} className="p-4">Indigo</div>
        </div>
    )
}