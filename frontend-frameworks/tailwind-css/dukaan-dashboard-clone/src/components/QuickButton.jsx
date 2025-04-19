export function QuickButton({
    title,
    count,
    bgColor,
    textColor
}) {
    return (
        <button className={`bg-[${bgColor}] rounded-full hover:cursor-pointer text-[${textColor}] p-1.5 w-32`}>
            {`${title} (${count})`}
        </button>
    )
}