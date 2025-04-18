import { RecoilRoot } from "recoil";
import { Header } from "./components/Header";


export default function App() {
  return (
    <>
      <RecoilRoot>
        <Header></Header>
      </RecoilRoot>
    </>
  )
}


