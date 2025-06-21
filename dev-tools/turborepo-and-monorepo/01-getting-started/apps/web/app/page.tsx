import { Signup } from "@repo/ui/signup"

export default function Home() {
  return (
    <div>
      <div className=" text-2xl text-bold flex p-3 bg-blue-300   items-center justify-center">
        Welcome to our website
      </div>

      <Signup />
    </div>
    )
      
}