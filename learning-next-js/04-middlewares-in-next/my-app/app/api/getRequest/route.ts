import { analystics } from "@/utils";
import { NextResponse } from "next/server";

export function GET() {
    console.log(analystics);
    
    return NextResponse.json({
        "Message": analystics.requestCount
    })
}