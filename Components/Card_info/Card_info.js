// UI ELEMENT ------------------




// FUNCTIONS COMPONENT ---------
export const openCardInfo = (elementRef) => {
  let x = document.getElementsByClassName("cardInfo");
  x.style.width = "90vw";
}
export const closeCardInfo = (elementRef) => {
  let x = document.getElementsByClassName("cardInfo");
  x.style.width = "0";
}