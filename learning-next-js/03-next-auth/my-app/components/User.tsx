import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth"

async function getUser() {
  const session = await getServerSession(NEXT_AUTH);
  console.log(session);
  return session;
}

export async function User() {
  const session = await getUser();

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}