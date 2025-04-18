export function Grid() {
    return (
        <div className="grid grid-cols-5">
            <div className="col-span-2 border-2 border-black p-4">Links</div>
            <div className="col-span-2 border-2 border-black p-4">Buttons</div>
            <div className="col-span-1 border-2 border-black p-4">Search</div>
        </div>
    )
}