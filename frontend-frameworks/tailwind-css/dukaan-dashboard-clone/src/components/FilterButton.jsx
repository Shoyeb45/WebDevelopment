export function FilterButton({
    title,
    icon
}) {
    return (
        <button className="flex text-center p-2.5 gap-3 items-center border-[#d9d9d9] text-[#4d4d4d] bg-white border rounded hover:cursor-pointer">
            {(title 
                && <div>{title}</div>)}
            <i className={`bi bi-${icon} font-bold text-gray-950`}></i>
        </button>
    )
}