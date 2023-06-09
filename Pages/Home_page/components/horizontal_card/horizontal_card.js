//IMPORT ----------------------

import { openCardInfo } from "../../../../Components/Card_info/Card_info.js";
import { loaderSpinner } from "../../../../Components/LoaderSpinner/loaderSpinner.js";
import { Scroll_list } from "../../../../Components/Scroll_list/Scroll_list.js";
import { displayVideoTrailer } from "../../../../Components/VideoOverlay/VideoOvelay.js";
import { createEl } from "../../../../js/Utils/DOM.js";

//UI ELEMENT ------------------
export const renderHorizontalCardSectionComponent = ({
  sectionName = "Popular",
  keyTag = "index",
  sectionIcon = "./Assets/icons8-prize-90-white.png",
  sectionPage = "/tv-series-top-rated.html",
  sectionFetch = () => {},
}) => {
  const homepage_section = createEl("div", "homepage_section");
  let lSectionName = sectionName.replace(/\s/g, "");
  //   HEADER --
  const homepage_section_header = createEl("div", "homepage_section_header");
  const homepage_section_title = createEl("p", "homepage_section_title");
  homepage_section_title.textContent = sectionName;

  const homepage_section_header_cta = createEl(
    "div",
    "homepage_section_header_cta"
  );
  homepage_section_header_cta.textContent = "Explore all";

  homepage_section_header_cta.addEventListener("click", () => {
    goToExploreAll(sectionFetch);
  });

  const homepage_section_header_cta_img = createEl("img");
  homepage_section_header_cta_img.src = "./Assets/icons8-forward-90-white.png";
  homepage_section_header_cta_img.alt = "Explore all img section";
  homepage_section_header_cta.append(homepage_section_header_cta_img);

  homepage_section_header.append(
    homepage_section_title,
    homepage_section_header_cta
  );

  //   HORIZONTAL CAROUSEL ----
  const homepage_section_carousel_wrapper = createEl(
    "div",
    "homepage_section_carousel_wrapper"
  );
  homepage_section_carousel_wrapper.id =
    "homepage_section_carousel_wrapper_" + lSectionName;

  const homepage_section_carousel = createEl(
    "div",
    "homepage_section_carousel"
  );
  for (let index = 0; index < 3; index++) {
    homepage_section_carousel.append(renderSkeletonCardHorizontal());
  }

  loadData(homepage_section_carousel, sectionFetch, [
    keyTag,
    sectionIcon,
    sectionPage,
    lSectionName,
  ]);
  homepage_section_carousel_wrapper.append(homepage_section_carousel);
  // ---------
  homepage_section.append(
    homepage_section_header,
    homepage_section_carousel_wrapper
  );
  return homepage_section;
};

// SKELETON -------
export const renderSkeletonCardHorizontal = () => {
  const horizontal_card = createEl("div", "horizontal_card");
  horizontal_card.append(loaderSpinner());
  return horizontal_card;
};
//ASYNC FUNCTIONS -------------
const loadData = async (fatherToAppend, callback, options) => {
  let { results } = await callback();
  fatherToAppend.textContent = "";
  results.forEach((element, index) => {
    fatherToAppend.append(renderCardHorizontal(element, index + 1, options));
  });
  Scroll_list("homepage_section_carousel_wrapper_" + options[3], true, true);
};
// FUNCTIONS ------------------
export const renderCardHorizontal = (data, index = null, options = []) => {
  const horizontal_card = createEl("div", "horizontal_card");
  horizontal_card.setAttribute(
    "style",
    `background-image: url('https://image.tmdb.org/t/p/original/${data.backdrop_path}');background-repeat: no-repeat;background-position: center;background-size: cover;`
  );

  //   OVERLAY ----
  const horizontal_card_overlay = createEl("div", "horizontal_card_overlay");
  const horizontal_card_overlay_title = createEl(
    "p",
    "horizontal_card_overlay_title"
  );
  horizontal_card_overlay_title.textContent = data.name;

  const horizontal_card_overlay_cta_container = createEl(
    "div",
    "horizontal_card_overlay_cta_container"
  );

  const horizontal_card_overlay_cta = createEl(
    "div",
    "horizontal_card_overlay_cta"
  );
  horizontal_card_overlay_cta.addEventListener("click", () => {
    startVideoTrailer(data);
  });
  const horizontal_card_overlay_cta_img = createEl("img");
  horizontal_card_overlay_cta_img.src = "./Assets/icons8-play-90-white.png";
  horizontal_card_overlay_cta_img.alt = "Play trailer icon";

  horizontal_card_overlay_cta.append(horizontal_card_overlay_cta_img);

  const horizontal_card_overlay_cta_info = createEl(
    "div",
    "horizontal_card_overlay_cta"
  );

  horizontal_card_overlay_cta_info.addEventListener("click", () => {
    openCardInfo(data);
  });

  const horizontal_card_overlay_cta_info_img = createEl("img");
  horizontal_card_overlay_cta_info_img.src =
    "./Assets/icons8-info-90-white.png";
  horizontal_card_overlay_cta_info_img.alt = "Open card info icon";

  horizontal_card_overlay_cta_info.append(horizontal_card_overlay_cta_info_img);

  //   horizontal_card_overlay_cta_container.append(
  //     horizontal_card_overlay_cta_info
  //   );
  horizontal_card_overlay_cta_container.append(
    horizontal_card_overlay_cta,
    horizontal_card_overlay_cta_info
  );

  horizontal_card_overlay.append(
    horizontal_card_overlay_title,
    horizontal_card_overlay_cta_container
  );
  const horizontal_card_index = createEl("div", "horizontal_card_index");

  switch (options[0]) {
    case "index":
      const horizontal_card_index_p = createEl("p");
      const horizontal_card_index_img = createEl("img");
      horizontal_card_index_img.src = options[1];
      horizontal_card_index_img.alt = "Popular card img icon";
      horizontal_card_index_p.textContent = "# " + index;
      horizontal_card_index.append(
        horizontal_card_index_img,
        horizontal_card_index_p
      );
      horizontal_card.append(horizontal_card_index, horizontal_card_overlay);
      break;
    case "live":
      const horizontal_card_index_p_live = createEl("p");
      const horizontal_card_index_img_live = createEl("img");
      horizontal_card_index_img_live.src = options[1];
      horizontal_card_index_img_live.alt = "live card img icon";
      horizontal_card_index_p_live.textContent = "";
      horizontal_card_index.append(
        horizontal_card_index_img_live,
        horizontal_card_index_p_live
      );
      horizontal_card.append(horizontal_card_index, horizontal_card_overlay);
      break;
    case "today":
      const horizontal_card_index_p_today = createEl("p");
      const horizontal_card_index_img_today = createEl("img");
      horizontal_card_index_img_today.src = options[1];
      horizontal_card_index_img_today.alt = "today card img icon";
      horizontal_card_index_p_today.textContent = "";
      horizontal_card_index.append(
        horizontal_card_index_img_today,
        horizontal_card_index_p_today
      );
      horizontal_card.append(horizontal_card_index, horizontal_card_overlay);
      break;

    default:
      horizontal_card.append(horizontal_card_overlay);
      break;
  }

  //   APPEND ---------

  //   RETURN ---------
  return horizontal_card;
};

// FUNCTIONS ---------
const startVideoTrailer = (data) => {
  console.log("startVideoTrailer");
  displayVideoTrailer(data.url_trailer);
};

const goToExploreAll = (callback) => {
  let aux = callback.toString();
  window.location.href = "/category.html?explore=" + aux.split(".")[1];
};
