"use client";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();
  
  return <div>
    <div>
      Welcome To main page
    </div>
    <div className="flex justify-center gap-3">
      <button onClick={() => {
        router.push('/sender')
      }} className="p-3 bg-amber-300 border border-amber-700 hover:bg-emerald-300">Go to sender</button>
      <button onClick={() => {
        router.push('/receiver')
      }} className="p-3 bg-emerald-300 border border-amber-700 hover:bg-amber-300">Go to receiver</button>
    </div>
  </div>
}