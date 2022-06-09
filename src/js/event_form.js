let currency_array = [];
function generate_currency(){
    let currency = document.querySelectorAll(`input[name="${name}"]:checked`);
    currency.forEach((radio) => {
        if (currency.value === "USD") {
            currency_array.push({"USD": "USD"});
        }
        else if(currency.value === "LRD") {
            currency_array.push({"LRD": "LRD"});
        }
    });
    // console.log("Thess are the currencies:");
}

