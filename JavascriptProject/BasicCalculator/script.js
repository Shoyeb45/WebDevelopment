const display = document.getElementById('display');

window.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/^[0-9/*+-\.]$/.test(key)) { 
    appendToDisplay(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'c' || key === 'C' || key === 'Escape') {
    clearDisplay();
  }
});

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}