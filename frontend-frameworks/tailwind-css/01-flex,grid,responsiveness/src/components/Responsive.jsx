export function Responsive() {
    return (
        <div className="sm:grid sm:grid-cols-12 ">
            <div className="p-6 border-3 border-amber-950 col-span-6 md:col-span-4 bg-amber-700 text-white">First Div</div>
            <div className="p-6 border-3 border-amber-950 col-span-6 md:col-span-4 bg-green-500 text-blue-900">Second Div</div>
            <div className="p-6 border-3 border-amber-950 col-span-12 md:col-span-4 bg-slate-800 text-yellow-200" >Third Div</div>
        </div>
    )
}