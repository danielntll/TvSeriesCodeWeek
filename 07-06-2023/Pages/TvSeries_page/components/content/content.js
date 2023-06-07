import { GenresData } from "../../../../Components/Header/header.js";
import { createEl } from "../../../../js/Utils/DOM.js";

export const renderMainContentTvShow = (previewData, root) => {
  const main_content = createEl("div", "main_content");
  root.setAttribute(
    "style",
    `background-image: url("https://image.tmdb.org/t/p/original/${previewData.backdrop_path}");`
  );
  //   ---
  const main_content_bg = createEl("div", "main_content_bg");
  //   ---
  const main_content_info = createEl("div", "main_content_info");
  const main_content_info_wrap = createEl("div", "main_content_info_wrap");
  //   ---
  const main_content_info_title = createEl("div", "main_content_info_title");
  const main_content_info_title_h1 = createEl("h1", "main_content_info_title");
  main_content_info_title_h1.textContent = previewData.name;
  main_content_info_title.append(main_content_info_title_h1);
  // ---
  const main_content_info_rating = createEl("div", "main_content_info_rating");
  const main_content_info_rating_img = createEl("img");
  main_content_info_rating_img.src = "./Assets/icons8-star-90-white.png";
  main_content_info_rating_img.alt = "Rating star img";

  const main_content_info_rating_values = createEl(
    "div",
    "main_content_info_rating_values"
  );
  const main_content_info_rating_values_p1 = createEl("p");
  main_content_info_rating_values_p1.textContent = previewData.vote_average;
  const main_content_info_rating_values_p2 = createEl("p");
  main_content_info_rating_values_p2.textContent = "/ 10";
  const main_content_info_rating_values_p3 = createEl("p");
  main_content_info_rating_values_p3.textContent = "|";
  const main_content_info_rating_values_p4 = createEl("p");
  main_content_info_rating_values_p4.textContent =
    previewData.vote_count + " votes";

  main_content_info_rating_values.append(
    main_content_info_rating_values_p1,
    main_content_info_rating_values_p2,
    main_content_info_rating_values_p3,
    main_content_info_rating_values_p4
  );
  main_content_info_rating.append(
    main_content_info_rating_img,
    main_content_info_rating_values
  );
  //   ---
  const main_content_info_genre = createEl("div", "main_content_info_genre");

  previewData.genre_ids.forEach((elem, index) => {
    const main_content_info_genre_title = createEl(
      "div",
      "main_content_info_genre_title"
    );
    const hero_card_genre_title_p = createEl("p");
    const aux = GenresData.find((element) => element.id === elem);
    hero_card_genre_title_p.textContent = aux.name;
    main_content_info_genre_title.append(hero_card_genre_title_p);

    const hero_card_genre_title_separator = createEl(
      "div",
      "main_content_info_genre_title_separator"
    );
    const hero_card_genre_title_separator_p = createEl("p");
    hero_card_genre_title_separator_p.textContent = "·";
    hero_card_genre_title_separator.append(hero_card_genre_title_separator_p);
    index !== previewData.genre_ids.length - 1
      ? main_content_info_genre.append(
          main_content_info_genre_title,
          hero_card_genre_title_separator
        )
      : main_content_info_genre.append(main_content_info_genre_title);
  });
  // ---
  const main_content_info_description = createEl(
    "div",
    "main_content_info_description"
  );
  const main_content_info_description_p = createEl("p");
  main_content_info_description_p.textContent = previewData.overview;
  main_content_info_description.append(main_content_info_description_p);
  //   ---
  const cardInfo_cta_container = createEl("div", "cardInfo_cta_container");
  const cardInfo_cta = createEl("div", "cardInfo_cta");
  const cardInfo_cta_img = createEl("img");
  cardInfo_cta_img.src = "./Assets/icons8-play-90-white.png";
  cardInfo_cta_img.alt = "Web movie img";
  const cardInfo_cta_p = createEl("p");
  cardInfo_cta_p.textContent = "trailer";
  cardInfo_cta.append(cardInfo_cta_img, cardInfo_cta_p);

  cardInfo_cta.addEventListener("click", () => {
    startVideoTrailer(data);
  });

  const cardInfo_cta_2 = createEl("div", "cardInfo_cta");
  const cardInfo_cta_img_2 = createEl("img");
  cardInfo_cta_img_2.src = "./Assets/icons8-website-90-white.png";
  cardInfo_cta_img_2.alt = "Web movie img";
  const cardInfo_cta_2_p = createEl("p");
  cardInfo_cta_2_p.textContent = "official website";
  cardInfo_cta_2.append(cardInfo_cta_img_2, cardInfo_cta_2_p);

  cardInfo_cta_2.addEventListener("click", () => {
    startVideoTrailer(data);
  });

  cardInfo_cta_container.append(cardInfo_cta, cardInfo_cta_2);

  //APPEND ----
  main_content_info_wrap.append(
    main_content_info_title,
    main_content_info_rating,
    main_content_info_genre,
    main_content_info_description,
    cardInfo_cta_container
  );
  main_content_info.append(main_content_info_wrap);
  main_content.append(main_content_bg, main_content_info);
  // Return-----
  return main_content;
};

// ASYNC FUNCTIONS -------------
const loadWebsiteData = () => {};

// FUNCTIONS -------------------
const startVideoTrailer = (data) => {
  console.log("startVideoTrailer");
};
