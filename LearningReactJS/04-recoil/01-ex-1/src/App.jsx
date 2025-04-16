import { RecoilRoot } from "recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { countAtom, evenSelector} from "./stores/atoms/count.atom.jsx";
import { useMemo } from "react";

export default function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  return (
    <div>
      <CountRenderer></CountRenderer>
      <Buttons></Buttons>
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);

  return (
    <>
      <div>Count is {count}</div>
      <EvenCountRenderer></EvenCountRenderer>
    </>
  );
}

function EvenCountRenderer() {
  const isEven = useRecoilValue(evenSelector);
  console.log(useRecoilValue);
  
  return (
    <div>
      {isEven?  undefined: "It is even"}
    </div>
  )
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);

  return (
    <div>
      {/* following is not best performance application */}
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase count
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease count
      </button> */}

      {/* Following is best performance app using useSetRecoilValue */}
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase count
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease count
      </button>
    </div>
  );
}
