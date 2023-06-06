// IMPORT
import { renderHeader } from "../../Components/Header/header.js";
import { getData } from "../../js/Utils/dbManager.js";
import { getEl } from "../../js/Utils/DOM.js";
import { renderVerticalCardSectionComponent } from "./components/hero_comp/hero_comp.js";

// RENDER -----------------
export const renderPage = (
  callback = () => {
    console.log("renderHomePage - DONE.");
  }
) => {
  // VARIABLES ----------------------
  const root = getEl("#root");
  // UI ELEMENTS --------------------
  // Header
  root.append(renderHeader());
  root.append(
    renderVerticalCardSectionComponent({
      sectionName: "Top Rated",
      sectionIcon: "./Assets/icons8-trophy-90-white.png",
      sectionPage: "/tv-series-top-rated.html",
      sectionFetch: () => getData.topRated(),
      isHero: true,
    })
  );

  // SECTION TOP RATED
  // SECTION POPULAR
  // SECTION ON THE AIR
  // SECTION ON THE AIRING TODAY
  // RETURN ---------------------------
  return callback();
};

renderPage();
// FUNCTIONS ------------
