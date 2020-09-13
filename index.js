const cuurencyEl1 = document.getElementById('currency1');
const amountEl1 = document.getElementById('amount1');
const cuurencyEl2 = document.getElementById('currency2');
const amountEl2 = document.getElementById('amount2');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//date now
var d = new Date();
var temp1 = d.getDate();
var temp2 = d.getMonth() + 1;
var temp3 = d.getFullYear();
//making time table default selected 


for (var i, j = 0; i = day.options[j]; j++) {
    if (i.value == temp1) {
        day.selectedIndex = j;
        break;
    }
}

for (var i, j = 0; i = month.options[j]; j++) {
    if (i.value == temp2) {
        month.selectedIndex = j;
        break;
    }
}

for (var i, j = 0; i = year.options[j]; j++) {
    if (i.value == temp3) {
        year.selectedIndex = j;
        break;
    }
}

//fetching rate through exchangeratesapi.io
function calculate1() {
    const currencyVal1 = cuurencyEl1.value;
    const currencyVal2 = cuurencyEl2.value;
    const yearVal = year.value;
    const monthVal = month.value;
    const dayVal = day.value;



    fetch(`https://api.exchangeratesapi.io/${yearVal}-${monthVal}-${dayVal}`)
        .then(res => res.json())
        .then(data => {

            var temp = data.rates[currencyVal1];
            var rate = data.rates[currencyVal2] / temp;

            rateEl.innerText = `1 ${currencyVal1} = ${rate} ${currencyVal2}`
            amountEl2.value = (amountEl1.value * rate).toFixed(3);
        }).catch(err => {
            console.err(err);
        });

}

function calculate() {
    const currencyVal1 = cuurencyEl1.value;
    const currencyVal2 = cuurencyEl2.value;

    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyVal1}`)
        .then(res => res.json())
        .then(data => {
            var rate = data.rates[currencyVal2];

            rateEl.innerText = `1 ${currencyVal1} = ${rate} ${currencyVal2}`
            amountEl2.value = (amountEl1.value * rate).toFixed(3);
        }).catch(err => {
            console.err(err);
        });

}

//event listener
cuurencyEl1.addEventListener('change', calculate);
amountEl1.addEventListener('input', calculate);
cuurencyEl2.addEventListener('change', calculate);
amountEl2.addEventListener('input', calculate);
day.addEventListener('change', calculate);
month.addEventListener('change', calculate);
year.addEventListener('change', calculate);

cuurencyEl1.addEventListener('change', calculate1);
amountEl1.addEventListener('input', calculate1);
cuurencyEl2.addEventListener('change', calculate1);
amountEl2.addEventListener('input', calculate1);
day.addEventListener('change', calculate1);
month.addEventListener('change', calculate1);
year.addEventListener('change', calculate1);


swap.addEventListener('click', () => {
    var temp = cuurencyEl1.value;
    cuurencyEl1.value = cuurencyEl2.value;
    cuurencyEl2.value = temp;
    calculate();
})

calculate();
calculate1();