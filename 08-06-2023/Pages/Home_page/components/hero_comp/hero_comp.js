//IMPORT ----------------------

import { openCardInfo } from "../../../../Components/Card_info/Card_info.js";
import { GenresData } from "../../../../Components/Header/header.js";
import { loaderSpinner } from "../../../../Components/LoaderSpinner/loaderSpinner.js";
import { displayVideoTrailer } from "../../../../Components/VideoOverlay/VideoOvelay.js";
import { createEl } from "../../../../js/Utils/DOM.js";

//UI ELEMENT ------------------
export const renderVerticalCardSectionComponent = ({
  sectionName = "Top Rated",
  keyTag = "index",
  sectionIcon = "./Assets/icons8-trophy-90-white.png",
  sectionPage = "/tv-series-top-rated.html",
  sectionFetch = () => {},
  isHero = true,
}) => {
  const homepage_section = createEl("div", "homepage_section");
  isHero ? homepage_section.classList.add("header") : null;

  // SECTION HEADER -------
  const homepage_section_header = createEl("div", "homepage_section_header");
  const homepage_section_title = createEl("p", "homepage_section_title");
  homepage_section_title.textContent = sectionName;
  const homepage_section_header_cta = createEl(
    "div",
    "homepage_section_header_cta"
  );
  homepage_section_header_cta.textContent = "Explore all";

  const homepage_section_header_cta_img = createEl("img");
  homepage_section_header_cta_img.src = "./Assets/icons8-forward-90-white.png";
  homepage_section_header_cta_img.alt = "Forward arrow icon";
  homepage_section_header_cta.append(homepage_section_header_cta_img);
  homepage_section_header.append(
    homepage_section_title,
    homepage_section_header_cta
  );

  //   CAROUSEL -------
  const homepage_section_carousel = createEl(
    "div",
    "homepage_section_carousel"
  );

  homepage_section_carousel.append(renderSkeleton());

  loadData(homepage_section_carousel, sectionFetch, [
    keyTag,
    sectionIcon,
    sectionPage,
  ]);

  // APPEND ---------
  homepage_section.append(homepage_section_header, homepage_section_carousel);
  // RETURN----------
  return homepage_section;
};

// SKELETON CARD -----------------
const renderSkeleton = () => {
  const skeleton = createEl("div", "hero_card");

  skeleton.append(loaderSpinner());
  return skeleton;
};

const renderCard = (data, index, options) => {
  const hero_card = createEl("div", "hero_card");
  hero_card.setAttribute(
    "style",
    `background-image: url('https://image.tmdb.org/t/p/original/${data.poster_path}');background-repeat: no-repeat;background-position: center;background-size: cover;`
  );

  const horizontal_card_index_upc = createEl(
    "div",
    "horizontal_card_index_upc"
  );

  const horizontal_card_index_top_rated = createEl(
    "div",
    "horizontal_card_index_top_rated"
  );
  const horizontal_card_index_top_rated_img = createEl("img");
  horizontal_card_index_top_rated_img.src = options[1];
  horizontal_card_index_top_rated_img.alt = "Card icon";

  const horizontal_card_index_top_rated_p = createEl("p");
  options[0] === "index"
    ? (horizontal_card_index_top_rated_p.textContent = "# " + index)
    : (horizontal_card_index_top_rated_p.textContent = " " + data.vote_average);
  horizontal_card_index_top_rated.append(
    horizontal_card_index_top_rated_img,
    horizontal_card_index_top_rated_p
  );

  horizontal_card_index_upc.append(horizontal_card_index_top_rated);

  //   OVERLAY
  const hero_card_overlay = createEl("div", "hero_card_overlay");
  const hero_card_title = createEl("p", "hero_card_title");
  hero_card_title.classList.add("margin-top");
  hero_card_title.textContent = data.name;

  const hero_card_rating = createEl("div", "hero_card_rating");
  const hero_card_rating_stars = createEl("div", "hero_card_rating_stars");
  const hero_card_rating_stars_img = createEl("img");
  hero_card_rating_stars_img.src = "./Assets/icons8-star-90-white.png";
  hero_card_rating_stars_img.alt = "Rating star icon";

  const hero_card_rating_stars_p1 = createEl("p");
  const hero_card_rating_stars_p1_b = createEl("b");
  hero_card_rating_stars_p1_b.textContent = data.vote_average;
  hero_card_rating_stars_p1.append(hero_card_rating_stars_p1_b);

  const hero_card_rating_stars_p2 = createEl("p");
  hero_card_rating_stars_p2.textContent = "/";
  const hero_card_rating_stars_p3 = createEl("p");
  hero_card_rating_stars_p3.textContent = "10";

  hero_card_rating_stars.append(
    hero_card_rating_stars_img,
    hero_card_rating_stars_p1,
    hero_card_rating_stars_p2,
    hero_card_rating_stars_p3
  );

  const hero_card_rating_vote_count = createEl(
    "div",
    "hero_card_rating_vote_count"
  );
  const hero_card_rating_vote_count_p1 = createEl("p");
  hero_card_rating_vote_count_p1.textContent = "|";
  const hero_card_rating_vote_count_p2 = createEl("p");
  hero_card_rating_vote_count_p2.textContent = data.vote_count;
  const hero_card_rating_vote_count_p3 = createEl("p");
  hero_card_rating_vote_count_p3.textContent = "votes";

  hero_card_rating_vote_count.append(
    hero_card_rating_vote_count_p1,
    hero_card_rating_vote_count_p2,
    hero_card_rating_vote_count_p3
  );

  hero_card_rating.append(hero_card_rating_stars, hero_card_rating_vote_count);

  const hero_card_genre = createEl("div", "hero_card_genre");

  data.genre_ids.forEach((elem, index) => {
    const hero_card_genre_title = createEl("div", "hero_card_genre_title");
    const hero_card_genre_title_p = createEl("p");
    const aux = GenresData.find((element) => element.id === elem);
    hero_card_genre_title_p.textContent = aux.name;
    hero_card_genre_title.append(hero_card_genre_title_p);

    const hero_card_genre_title_separator = createEl(
      "div",
      "hero_card_genre_title_separator"
    );
    const hero_card_genre_title_separator_p = createEl("p");
    hero_card_genre_title_separator_p.textContent = "·";
    hero_card_genre_title_separator.append(hero_card_genre_title_separator_p);
    index !== data.genre_ids.length - 1
      ? hero_card_genre.append(
          hero_card_genre_title,
          hero_card_genre_title_separator
        )
      : hero_card_genre.append(hero_card_genre_title);
  });

  // hero_card_cta
  const hero_card_cta = createEl("div", "hero_card_cta");
  const hero_card_cta_btn = createEl("div", "hero_card_cta_btn");
  hero_card_cta_btn.classList.add("info");
  hero_card_cta_btn.addEventListener("click", () => openCardInfo(data));

  const hero_card_cta_btn_p = createEl("p");
  hero_card_cta_btn_p.textContent = "Open card";
  const hero_card_cta_btn_img = createEl("img");
  hero_card_cta_btn_img.src = "./Assets/icons8-info-90-white.png";
  hero_card_cta_btn_img.alt = "CTA card open info";

  hero_card_cta_btn.append(hero_card_cta_btn_p, hero_card_cta_btn_img);

  const hero_card_cta_trailer = createEl("div", "hero_card_cta_btn");
  hero_card_cta_trailer.classList.add("trailer");
  const hero_card_cta_trailer_p = createEl("p");
  hero_card_cta_trailer_p.textContent = "Trailer";
  const hero_card_cta_trailer_img = createEl("img");
  hero_card_cta_trailer_img.src = "./Assets/icons8-play-90-white.png";
  hero_card_cta_trailer_img.alt = "CTA play trailer";
  hero_card_cta_trailer.append(
    hero_card_cta_trailer_p,
    hero_card_cta_trailer_img
  );
  hero_card_cta_trailer.addEventListener("click", () => {
    startVideoTrailer(data);
  });

  hero_card_cta.append(hero_card_cta_btn, hero_card_cta_trailer);

  hero_card_overlay.append(
    hero_card_title,
    hero_card_rating,
    hero_card_genre,
    hero_card_cta
  );

  hero_card.append(horizontal_card_index_upc, hero_card_overlay);
  // RETURN --------
  return hero_card;
};

//ASYNC FUNCTIONS -------------
const loadData = async (fatherToAppend, callback, options) => {
  let { results } = await callback();
  fatherToAppend.textContent = "";
  console.log(results);
  results.forEach((element, index) => {
    fatherToAppend.append(renderCard(element, index + 1, options));
  });
};
// FUNCTIONS ------------------
const startVideoTrailer = (data) => {
  displayVideoTrailer(data.url_trailer);
};
