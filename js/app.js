import { renderHomePage } from "../Pages/Home_page/homepage.js";

// -------------- INITIALIZZATION --------------------
export const BASE_PATH = window.location.pathname;

switch (window.location.pathname.split(".")[0]) {
  case "/index":
    renderHomePage();
    break;
  case "/tv-series":
    renderTvSeries();
    break;
  default:
    renderHomePage();
    break;
}
