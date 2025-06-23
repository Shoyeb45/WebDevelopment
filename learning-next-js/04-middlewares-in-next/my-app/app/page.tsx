import Image from "next/image";

export default async function Home() {

  let requestCount = await fetch("http://localhost:3000/api/getRequest");
  requestCount = await requestCount.json();

  return (<div>
    Number of requests : {requestCount.message}
  </div>);
}
