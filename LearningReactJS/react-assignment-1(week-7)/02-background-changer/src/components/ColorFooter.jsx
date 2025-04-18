import "./../styles/ColorFooter.css";
import { useRecoilState } from "recoil";
import { colorAtom } from "../stores/color.store";

export function ColorFooter() {
  return (
    <div className="color-container">
      <ColorButton color={"Red"}></ColorButton>
      <ColorButton color={"Yellow"}></ColorButton>
      <ColorButton color={"Black"}></ColorButton>
      <ColorButton color={"Purple"}></ColorButton>
      <ColorButton color={"Green"}></ColorButton>
      <ColorButton color={"Default"}></ColorButton>
    </div>


  );
}

function ColorButton({ color }) {

  function changeColor(event) {
    document.body.style.backgroundColor = event.target.style.backgroundColor;
  }

  return (
    <button
      style={{
        backgroundColor: color === "Default" ? "orange" : color,
        color: color === "Black" ? "white" : "black",
      }}
      className="color-box"
      onClick={changeColor}
    >
      {color}
    </button>
  );
}
