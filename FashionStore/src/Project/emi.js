textInput = document.getElementsByClassName("form-control");
ranges = document.getElementsByClassName("form-range");

for(let i = 0; i <= 2; i++) {
    ranges[i].addEventListener(
        "input",
        () => {
            if(i == 0) {
                let indianRuppe = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    }
                )
                
                textInput[i].setAttribute("value", indianRuppe.format(ranges[i].value));
            }   
            else {
                textInput[i].setAttribute("value", ranges[i].value);
            }         
        }
    );
}