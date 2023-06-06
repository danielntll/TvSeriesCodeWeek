// import { openCardInfo, closeCardInfo } from '../Components/Card_info/Card_info.js'

const openCardInfo = (elementRef) => {
  let aux = document.getElementById("cardInfo");
  aux.style.height = "90vh";
  aux.style.visibility = "visible";
}
const closeCardInfo = (elementRef) => {
  let aux = document.getElementById("cardInfo");
  aux.style.height = "0vh";
  aux.style.visibility = "hidden";
}
console.log("ASc");