let buttons = document.getElementsByClassName("btn");
let expression = document.getElementById("result");

for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].addEventListener("click", () => {
        writeToTextArea(buttons[i].innerHTML, expression)
    })
}

buttons[buttons.length - 1].addEventListener("click", () => {
    calculate(expression);
})
function writeToTextArea(character, textArea) {
    text = textArea.innerHTML + character
    console.log(text);
    
    textArea.innerHTML = text
}

function calculate(textArea) {
    textArea.innerHTML = eval(textArea.innerHTML)
}