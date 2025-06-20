import { NextRequest } from "next/server";
import { userSignUpPayload } from "@/types/authentication.type";
import client from "@/utils/db"

export async function POST(request: NextRequest) {
    try {
        let body = await request.json();
        body = userSignUpPayload.safeParse(body);
        
        if (!body.success) {
            return Response.json({
                ok: false,
                body,
                "error" : "User validation failed"
            })
        }
        console.log(body);
        
        const result = await client.user.create({
            data: {
                name: body.data.name,
                email: body.data.email,
                password: body.data.password
            }
        })

        return Response.json({
            result,
            "message": "Success in creating new user"
        })
    } catch (error) {
        console.log(error);
        
        return Response.json({
            "error" : error,
            "message" : error?.message || "Some error occured"
        })
    }
}