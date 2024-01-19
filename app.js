const base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
let btn = document.querySelector("form button")
let dropdowns = document.querySelectorAll(".select-options select")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let mdg = document.querySelector(".message span")
for (let select of dropdowns) {
  for(const item in countryList){
    let newoption = document.createElement("option")
    newoption.innerHTML = item
    newoption.value = item
    if(select.name=="from" && item=="USD"){
        newoption.selected = "selected"
    }
    else if(select.name=="to" && item=="INR"){
        newoption.selected = "selected"
    }
    select.appendChild(newoption)
  }
  select.addEventListener("change",(e)=>{
    updateFlag(e.target)
  })
}
btn.addEventListener("click",async (e)=>{
    e.preventDefault()
    let val = document.querySelector("input")
    console.log(val.value)
    if(val.value=="" || val.value<0){
        val.value = "1"
    }
    // new_value = val.value*(toCurr.value)
    // console.log(fromCurr.value)
    // console.log(toCurr.value)
    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let new_val = val.value*data[toCurr.value.toLowerCase()]
    mdg.innerText = `${val.value} ${fromCurr.value} = ${new_val} ${toCurr.value}`;

})
const updateFlag = (e)=>{
    countrycode = e.value
    image_code= countrycode.slice(0,2)
    console.log(image_code)
    let image = e.parentElement.querySelector("img")
    image.src = `https://flagsapi.com/${image_code}/flat/64.png`
}