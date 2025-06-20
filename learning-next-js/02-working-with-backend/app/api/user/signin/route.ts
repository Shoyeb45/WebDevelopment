import { NextRequest } from "next/server";
import { userSignInPayload } from "@/types/authentication.type";
import client from "@/utils/db";

export async function POST(request: NextRequest) {
    try {
        let body = await request.json();
        body = userSignInPayload.safeParse(body);
        
        if (!body.success) {
            return Response.json({
                ok: false,
                body,
                "error" : "User validation failed"
            })
        }
        
        const result = await client.user.findFirst({
            where: {
                email: body.data.email
            }
        });

        if (!result) {
            return Response.json({
                "ok": false,
                "error": "User not found"
            })
        }


        if (result?.password !== body.data.password) {
            return Response.json({
                "error": "Password didn't match" ,
                "ok": false
            })
        }
        return Response.json({
            "ok": true,
            "message": "Password matched"
        })
    } catch (error) {
        console.log(error);
        
        return Response.json({
            "ok": false,
            "error" : error,
            "message" : error?.message || "Some error occured"
        })
    }
}