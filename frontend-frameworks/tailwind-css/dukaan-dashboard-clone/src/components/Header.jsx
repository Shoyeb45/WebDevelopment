import { SearchBar } from "./SearchBar";


{/* <SearchBar placeholder={"Order ID or Transaction ID"} isBorder={true} bgColor={"white"}/> */}


export function Header() {
    return (
            <header className="flex justify-between p-4 border-b-1 border-b-[#D9D9D9]">
            <LeftHeader></LeftHeader>
            <SearchBar placeholder={"Search features, tutorials, etc."} isBorder={false} bgColor={"#f2f2f2"}/>
            
            <RightHeader />
        </header>
    )
}

function LeftHeader() {
    return (
        <div className="flex justify-between items-center gap-4 ms-3.5">
            <div className="font-medium text-xl text-center" >Payouts</div><i className="bi bi-question-circle"></i>
            <div className="text-gray-700 hidden sm:inline">How it works?</div>
        </div>
    )
}



function RightHeader() {
    return (
        <div className="flex gap-2 text-[#4D4D4D] text-center ">
            <div className="bi bi-megaphone-fill rounded-full p-2 w-10 bg-[#e6e6e6]"></div>
            <div className="bi bi-caret-down-fill rounded-full p-2 w-10 bg-[#e6e6e6]"></div>
        </div>
    )
}