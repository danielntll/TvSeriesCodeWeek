// UI ELEMENT ------------------

// FUNCTIONS COMPONENT ---------
export const openCardInfo = (elementRef) => {
  console.log(elementRef);
  let x = document.getElementById("cardInfo");
  x.style.height = "90vh";
  x.style.visibility = "visible";
};
export const closeCardInfo = (elementRef) => {
  let x = document.getElementsByClassName("cardInfo");
  x.style.height = "0";
  x.style.visibility = "hidden";
};
