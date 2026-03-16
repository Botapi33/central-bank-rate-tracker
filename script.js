const banks = [

{name:"Federal Reserve",country:"United States",rate:"5.25–5.50%"},
{name:"European Central Bank",country:"Euro Area",rate:"4.00%"},
{name:"Bank of England",country:"United Kingdom",rate:"5.25%"},
{name:"Bank of Japan",country:"Japan",rate:"0.10%"},
{name:"People's Bank of China",country:"China",rate:"3.45%"},
{name:"Swiss National Bank",country:"Switzerland",rate:"1.75%"},
{name:"Bank of Canada",country:"Canada",rate:"5.00%"},
{name:"Reserve Bank of Australia",country:"Australia",rate:"4.35%"},
{name:"Reserve Bank of India",country:"India",rate:"6.50%"},
{name:"Norges Bank",country:"Norway",rate:"4.50%"},
{name:"Riksbank",country:"Sweden",rate:"4.00%"},
{name:"Central Bank of Brazil",country:"Brazil",rate:"10.50%"}

]

const container = document.getElementById("rates")

banks.forEach(bank => {

const div = document.createElement("div")
div.className = "bank"

div.innerHTML = `
<h3>${bank.name}</h3>
<p>${bank.country}</p>
<div class="rate">${bank.rate}</div>
`

container.appendChild(div)

})
