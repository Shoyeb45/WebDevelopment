export function SearchBar({
    bgColor,
    placeholder,
    isBorder
}) {

    const border = (isBorder? "border-1 border-[#d9d9d9] rounded": "");
    return (
        <div className={" flex items-center p-2 sm:w-90 text-[#808080] gap-3 " + `bg-[${bgColor}] ${border}`}>
            <i className="bi bi-search"></i>
            <input type="text" placeholder={placeholder} className="bg-transparent outline-none sm:w-full"/>
        </div>
    )
}