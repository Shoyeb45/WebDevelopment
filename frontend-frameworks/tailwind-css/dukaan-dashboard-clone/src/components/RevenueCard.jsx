function getWhiteColor(color) {
    return (color ? "text-" + color: "");
}

export const RevenueCard = ({
    title,
    orderCount,
    amount,
    color
}) => {
    return (
        <div className={"flex flex-col shadow-md gap-3 p-6 " + getWhiteColor(color) + " rounded-xl h-28  flex-grow gap-5"}>
            <div className={"text-gray-600" + getWhiteColor(color)}>{title} <i className="bi bi-question-circle"></i></div>

            <div className="flex justify-between items-center">
                <div className={"text-black text-3xl font-medium " + getWhiteColor(color)}>₹{amount.toLocaleString()}</div>
               
                {orderCount ? <div className={"text-cyan-600 " + getWhiteColor(color)}>
                    
                    <a href="#" className="underline">
                        {orderCount} Orders 
                    </a>
                    <i className="bi bi-chevron-right"></i>
                </div>: null}
                
            </div>
        </div>

    )
}