import { RevenueCard } from "./RevenueCard";


export function ColoredRevenueCard({
    title, 
    amount,
    orderCount,
    subTitle,
    dataTime
}) {
    return (
        <div className="text-white flex flex-col flex-grow">

            <div className="bg-[#146EB4] rounded-t-xl hover:bg-[#0e4f82]">
                <RevenueCard title={title} amount={amount} orderCount={orderCount} color={"white"}></RevenueCard>
            </div>

            <div className="bg-[#0E4F82] p-3 flex justify-between rounded-b-xl">
                <div>{subTitle}</div>
                <div>{dataTime}</div>
            </div>

        </div>
    )
}