import { Overview } from "./components/Overview";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { navLinks, transactions } from "./Data";
import { FilterButton } from "./components/FilterButton";
import { QuickButton } from "./components/QuickButton";
import { TransactionTable } from "./components/TransactionTable";
import { SearchBar } from "./components/SearchBar";



export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="bg-gray-100 hidden lg:block">
        <NavBar
          navLinks={navLinks}
          name="Shoyeb"
          imgLink={
            "https://dashboard-clone-dukaan.vercel.app/_next/static/media/nishyan.760570e2.svg"
          }
          credits={224.1}
        />
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-grow">
        {/* Header (fixed at top) */}
        <div className=" bg-white z-10">
          <Header />
        </div>

        {/* Main scrollable content */}
        <main className="flex-grow overflow-y-auto p-4 bg-gray-50">

          <div>
            <div className="flex justify-between p-3.5">
              <h1 className="text-xl font-medium">Overview</h1>
              <FilterButton title={"This Month"} icon={"chevron-down"} />
            </div>

            <div className="ms-3">
              <Overview />
            </div>
          </div>

          <div className="p-3.5 mt-3.5">
            <h1 className="text-xl font-medium text-[#1A181E] ">
              Transactions | This Month
            </h1>
          </div>

          <div className="flex gap-3 p-2">
            <QuickButton
              title={"Payouts"}
              count={22}
              textColor={"#808080"}
              bgColor={"#e6e6e6"}
            />

            <QuickButton
              title={"Refunds"}
              count={6}
              textColor={"#ffffff"}
              bgColor={"#146eb4"}
            />
          </div>

          <div className="flex justify-between p-3 mt-4">
            <div>
              <SearchBar
                placeholder={"Order ID or transactions ID"}
                isBorder={true}
                bgColor={"#ffffff"}
              />
            </div>
            
            <div className="flex gap-3">
              <FilterButton
                title={"Sort"}
                icon={"arrow-down-up"}
              />
              <FilterButton
                icon={"download"}
              /> 
            </div>
          </div>
          
          <div className="p-3">
            <TransactionTable transactions={transactions} />
          </div>
        </main>
      </div>
    </div>
  );
}
