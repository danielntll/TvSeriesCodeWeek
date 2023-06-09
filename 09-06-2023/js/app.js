import { renderHomePage } from "../Pages/Home_page/homepage.js";

// -------------- INITIALIZZATION --------------------
export const BASE_PATH = "";

switch (window.location.pathname.split(".")[0]) {
  case "/index":
    renderHomePage();
    break;
  case "/tv-series":
    // renderTvSeries();
    break;
  default:
    renderHomePage();
    break;
}
