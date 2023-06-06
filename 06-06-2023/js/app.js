// import { openCardInfo, closeCardInfo } from '../Components/Card_info/Card_info.js'
import { renderPage } from "../Pages/Home_page/homepage.js";
import { getData } from "./Utils/dbManager.js";
import { getEl } from "./Utils/DOM.js";
import { homepageUrl } from "./Utils/navigationUrls.js";

const openCardInfo = (elementRef) => {
  let aux = document.getElementById("cardInfo");
  aux.style.height = "90vh";
  aux.style.visibility = "visible";
};
const closeCardInfo = (elementRef) => {
  let aux = document.getElementById("cardInfo");
  aux.style.height = "0vh";
  aux.style.visibility = "hidden";
};

// -------------- INITIALIZZATION --------------------
renderPage();
