"use client"
import { useSession } from "next-auth/react"

export  function UserDetail() {
    const session = useSession();

    return (
        <div className="flex flex-col">
            <div>
                <div>
                    Username
                </div>
                <div>
                    {JSON.stringify(session.data)}
                </div>
            </div>
        </div>
    )
}