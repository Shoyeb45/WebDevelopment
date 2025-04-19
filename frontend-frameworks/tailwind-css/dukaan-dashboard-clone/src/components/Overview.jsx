import { RevenueCard } from "./RevenueCard";
import { ColoredRevenueCard } from "./ColoredRevenueCard";

export function Overview() {
  return (
    <div className="flex gap-5 flex-wrap">

      <ColoredRevenueCard
        title={"Next Payout"}
        amount={2312.23}
        orderCount={23}
        subTitle={"Next Payment Date:"}
        dataTime={"Today, 4:00PM"}
      ></ColoredRevenueCard>

      <RevenueCard
        title={"Amount Pending"}
        amount={92_310.2}
        orderCount={13}
      ></RevenueCard>

      <RevenueCard
        title={"Amount Processed"}
        amount={2392312.19}
      ></RevenueCard>
    </div>
  );
}
