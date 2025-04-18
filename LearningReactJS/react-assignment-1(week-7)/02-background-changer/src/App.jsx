import { ColorFooter } from "./components/ColorFooter"
import { RecoilRoot, useRecoilValue } from 'recoil';
import { colorAtom } from "./stores/color.store";
import { useEffect } from "react";


export default function App() {

  return (
    <RecoilRoot>
      <ColorFooter></ColorFooter>
    </RecoilRoot>
  )
}