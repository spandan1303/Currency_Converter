const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");  //this will create a nodelist named dropdowns with [<select>,<select>]
// console.log(dropdown);
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//for traversing the node list (containg <select>s...) and the options inside <select> refer this code as written:
// for (const select of dropdowns) {
//     console.log("Selected:", select.value); // currently selected value

//     console.log("All options:");
//     for (const option of select.options) {
//         console.log(option.value); // all option values
//     }
// }

for (select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }

    //if there is a change in select....then the country flag must be updated
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    //console.log(element.value);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    //i have to go to the parent div...to change img..
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // ✅✅ UPDATED URL and data access according to new API format (-->ChatGpt)
    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${from}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[from][to];  // ✅ new way to access nested rates (--ChatGpt)

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
