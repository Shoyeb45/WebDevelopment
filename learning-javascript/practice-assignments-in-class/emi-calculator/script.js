const calculateButton = document.querySelector("#calc-button");

const sliderAmount = document.querySelector("#slider-amount");
const sliderYear = document.querySelector("#slider-year");
const sliderRate = document.querySelector("#slider-rate");

const inputAmount = document.querySelector("#txtAmount");
const inputYear = document.querySelector("#txtYear");
const inputRate = document.querySelector("#txtRate");

console.log(sliderRate);
sliderRate.addEventListener("change", (e) => {
  inputRate.setAttribute("value", e.target.value);
});

sliderAmount.addEventListener("change", (e) => {
  let amount = Number(e.target.value);
  let amountInRuppes = amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  inputAmount.setAttribute("value", amountInRuppes);
});

sliderYear.addEventListener("change", (e) => {
  inputYear.setAttribute("value", e.target.value);
});

function calculateEMI(amount, year, rate) {
  let monthlyRate = rate / 12;
  let months = year * 12;

  let x = Math.pow(1 + monthlyRate, months);
  return amount * monthlyRate * (x / (x - 1));
}

calculateButton.addEventListener("click", (e) => {
  let amount = Number(sliderAmount.value);
  let rate = Number(sliderRate.value);
  let year = Number(sliderYear.value);
  let emiAmount = calculateEMI(amount, year, rate);

  document.querySelector("#emi-amount").innerHTML = emiAmount.toLocaleString(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
    },
  );
  document.querySelector("#months").innerHTML = year * 12;
});
