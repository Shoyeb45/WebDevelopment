import axios from "axios";
import client from "@/utils/db";
import { SignUpType } from "@/types/authentication.type";

async function getUserData() {
  try {
    const users = await client.user.findMany({});
    return users;
  } catch (error) {
    return null
  }  
}
// async function getUserData() {
//   try {
//     const data = await axios.get('https://dummyjson.com/users');
//     return data.data?.users;     
//   } catch (error) {
//     return null
//   }  
// }


export default async function Home() {
  const data = await getUserData();
  
  return (
    <div className="grid grid-cols-4 bg-blue-200 border text-center items-center p-3  gap-3">
      {/* <User user={sampleUser} /> */}
      {data && data.map((userData: SignUpType, idx: Number) => (
        
         <User user={userData} key={idx.toString()}/>
      ))}
    </div>
  );
}



function User({ user }: {
  user: SignUpType
}) {
  return (
    <div className="flex flex-col p-5 gap-4 rounded-xl border-4 bg-blue-400">
      <h2 className="p-1 bg-gray-800 text-white rounded-xl text-center">{user.name}</h2>
      <h3 className="p-1 bg-gray-800 text-white rounded-xl text-center">{user.email}</h3>
    </div>
  )
}