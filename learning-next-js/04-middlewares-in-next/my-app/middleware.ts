import { NextRequest, NextResponse } from "next/server";
import { analystics } from "./utils";

export function middleware(request: NextRequest) {
    analystics.requestCount++;
    console.log(analystics)
    return NextResponse.next();
}