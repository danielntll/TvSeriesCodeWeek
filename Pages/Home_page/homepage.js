// IMPORT
import { renderHeader } from "../../Components/Header/header.js";
import { getData } from "../../js/Utils/dbManager.js";
import { getEl } from "../../js/Utils/DOM.js";
import { renderVerticalCardSectionComponent } from "./components/hero_comp/hero_comp.js";
import { renderHorizontalCardSectionComponent } from "./components/horizontal_card/horizontal_card.js";

// RENDER -----------------
export const renderHomePage = (
  callback = () => {
    console.log("renderHomePage - DONE.");
  }
) => {
  // VARIABLES ----------------------
  const root = getEl("#root");
  // UI ELEMENTS --------------------
  // Header
  root.append(renderHeader());
  // SECTION TOP RATED
  root.append(
    renderVerticalCardSectionComponent({
      sectionName: "Top Rated",
      sectionIcon: "./Assets/icons8-trophy-90-white.png",
      sectionPage: "/tv-series-top-rated.html",
      sectionFetch: () => getData.topRated(),
      isHero: true,
    })
  );

  // SECTION POPULAR
  root.append(
    renderHorizontalCardSectionComponent({
      sectionName: "Popular",
      keyTag: "index",
      sectionIcon: "./Assets/icons8-prize-90-white.png",
      sectionPage: "/tv-series-top-rated.html",
      sectionFetch: () => getData.popular(),
    })
  );
  // SECTION ON THE AIR
  root.append(
    renderHorizontalCardSectionComponent({
      sectionName: "On The Air",
      keyTag: "live",
      sectionIcon: "./Assets/icons8-live-video-on-90-white.png",
      sectionPage: "/tv-series-top-rated.html",
      sectionFetch: () => getData.onTheAir(),
    })
  );
  // SECTION ON THE AIRING TODAY
  root.append(
    renderHorizontalCardSectionComponent({
      sectionName: "Airing today",
      keyTag: "today",
      sectionIcon: "./Assets/icons8-collegato-90-white.png",
      sectionPage: "/tv-series-top-rated.html",
      sectionFetch: () => getData.airingToday(),
    })
  );
  // RETURN ---------------------------
  return callback();
};

renderHomePage();
// FUNCTIONS ------------
