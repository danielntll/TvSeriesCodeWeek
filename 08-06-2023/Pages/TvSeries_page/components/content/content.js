import { GenresData } from "../../../../Components/Header/header.js";
import { loaderSpinner } from "../../../../Components/LoaderSpinner/loaderSpinner.js";
import { openModalEpisodes } from "../../../../Components/Modal_episodes/Modal_episodes.js";
import { Scroll_list } from "../../../../Components/Scroll_list/Scroll_list.js";
import { displayVideoTrailer } from "../../../../Components/VideoOverlay/VideoOvelay.js";
import { getData } from "../../../../js/Utils/dbManager.js";
import { createEl } from "../../../../js/Utils/DOM.js";

export const renderMainContentTvShow = (previewData, castAndCrew, root) => {
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

  if (previewData.genre_ids) {
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
  } else {
    previewData.genres.forEach((elem, index) => {
      const main_content_info_genre_title = createEl(
        "div",
        "main_content_info_genre_title"
      );
      const hero_card_genre_title_p = createEl("p");
      const aux = GenresData.find((element) => element.id === elem.id);
      hero_card_genre_title_p.textContent = aux.name;
      main_content_info_genre_title.append(hero_card_genre_title_p);

      const hero_card_genre_title_separator = createEl(
        "div",
        "main_content_info_genre_title_separator"
      );
      const hero_card_genre_title_separator_p = createEl("p");
      hero_card_genre_title_separator_p.textContent = "·";
      hero_card_genre_title_separator.append(hero_card_genre_title_separator_p);
      index !== previewData.genres.length - 1
        ? main_content_info_genre.append(
            main_content_info_genre_title,
            hero_card_genre_title_separator
          )
        : main_content_info_genre.append(main_content_info_genre_title);
    });
  }

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
    startVideoTrailer(previewData);
  });

  const cardInfo_cta_2 = createEl("div", "cardInfo_cta");
  cardInfo_cta_2.id = "btn_officialSite";

  cardInfo_cta_container.append(
    cardInfo_cta,
    skeletonBtnOfficialSite(cardInfo_cta_2)
  );

  // -----
  const cardInfo_cast_container = createEl("div", "cardInfo_cast_container");
  cardInfo_cast_container.id = "cardInfo_cast_container";
  const cardInfo_cast = createEl("div", "cardInfo_cast");
  castAndCrew.cast.forEach((elem, index) => {
    const cardInfo_cast_actor = createEl("div", "cardInfo_cast_actor");
    const cardInfo_cast_actor_avatar = createEl(
      "div",
      "cardInfo_cast_actor_avatar"
    );

    const cardInfo_cast_actor_avatar_img = createEl("img");
    cardInfo_cast_actor_avatar_img.src =
      "https://image.tmdb.org/t/p/original" + elem.profile_path;
    cardInfo_cast_actor_avatar_img.alt = elem.original_name + "img";
    cardInfo_cast_actor_avatar.append(cardInfo_cast_actor_avatar_img);

    const cardInfo_cast_actor_info = createEl(
      "div",
      "cardInfo_cast_actor_info"
    );
    const cardInfo_cast_actor_info_p1 = createEl("p");
    cardInfo_cast_actor_info_p1.textContent = elem.original_name;
    const cardInfo_cast_actor_info_p2 = createEl("p");
    cardInfo_cast_actor_info_p2.textContent = elem.character;
    cardInfo_cast_actor_info.append(
      cardInfo_cast_actor_info_p1,
      cardInfo_cast_actor_info_p2
    );
    cardInfo_cast_actor.append(
      cardInfo_cast_actor_avatar,
      cardInfo_cast_actor_info
    );
    cardInfo_cast.append(cardInfo_cast_actor);
  });

  cardInfo_cast_container.append(cardInfo_cast);

  // ----
  const main_content_info_seasons_container = createEl(
    "div",
    "main_content_info_seasons_container"
  );
  main_content_info_seasons_container.id =
    "main_content_info_seasons_container";
  skeletonSeasons(main_content_info_seasons_container);

  //   ----
  const main_content_info_created_by_container = createEl(
    "div",
    "main_content_info_created_by_container"
  );
  main_content_info_created_by_container.id =
    "main_content_info_created_by_container";

  skeletonCreatedBy(main_content_info_created_by_container);

  //APPEND ----
  main_content_info_wrap.append(
    main_content_info_title,
    main_content_info_rating,
    main_content_info_genre,
    main_content_info_description,
    cardInfo_cta_container,
    cardInfo_cast_container,
    main_content_info_seasons_container,
    main_content_info_created_by_container
  );
  main_content_info.append(main_content_info_wrap);
  main_content.append(main_content_bg, main_content_info);
  // FETCH DETAILED DATA  -----
  loadData(previewData.id);
  // Return-----
  return main_content;
};

// SKELETONS -------------------
const skeletonBtnOfficialSite = (container) => {
  container.append(loaderSpinner());
  return container;
};

const skeletonSeasons = (container) => {
  const main_content_info_seasons_container_info = createEl(
    "div",
    "main_content_info_seasons_container_info"
  );
  const main_content_info_seasons_container_title = createEl(
    "p",
    "main_content_info_seasons_container_title"
  );
  main_content_info_seasons_container_title.textContent =
    "Seasons: Caricamento";
  const main_content_info_seasons_container_subtitle = createEl(
    "p",
    "main_content_info_seasons_container_subtitle"
  );

  main_content_info_seasons_container_info.append(
    main_content_info_seasons_container_title,
    main_content_info_seasons_container_subtitle
  );

  const main_content_info_seasons_container_content = createEl(
    "div",
    "main_content_info_seasons_container_content"
  );

  const main_content_info_seasons_vertical = createEl(
    "div",
    "main_content_info_seasons_vertical"
  );

  main_content_info_seasons_vertical.append(loaderSpinner());

  container.append(
    main_content_info_seasons_container_info,
    main_content_info_seasons_vertical
  );
};

const skeletonCreatedBy = (container) => {
  const main_content_info_created_by_title = createEl(
    "p",
    "main_content_info_created_by_title"
  );
  main_content_info_created_by_title.textContent = "Created by:";
  container.append(main_content_info_created_by_title, loaderSpinner());
};
// ASYNC FUNCTIONS -------------
const loadData = async (idSeries) => {
  const detailedData = await getData.seriesDetails(idSeries);

  console.log("detailedData : ", detailedData);
  // Elements need to be fetched with data:
  //   BTN WEB SITE------
  const btn_officialSite = document.getElementById("btn_officialSite");
  btnOfficialSite(btn_officialSite, detailedData);
  // SEASONS CONTENT  ---
  const main_content_info_seasons_container = document.getElementById(
    "main_content_info_seasons_container"
  );
  seasonsContainer(main_content_info_seasons_container, detailedData);

  //   CREATED BY :
  const main_content_info_created_by_container = document.getElementById(
    "main_content_info_created_by_container"
  );
  createdByContainer(main_content_info_created_by_container, detailedData);
};

// UI FETCHED -----------------
const btnOfficialSite = (element, { homepage }) => {
  element.textContent = "";
  const cardInfo_cta_img_2 = createEl("img");
  cardInfo_cta_img_2.src = "./Assets/icons8-website-90-white.png";
  cardInfo_cta_img_2.alt = "Web movie img";
  const cardInfo_cta_2_p = createEl("p");
  cardInfo_cta_2_p.textContent = "official website";
  element.append(cardInfo_cta_img_2, cardInfo_cta_2_p);
  element.addEventListener("click", () => {
    window.open(homepage, "_blank");
  });
};

const seasonsContainer = (element, { seasons, status, poster_path, id }) => {
  element.textContent = "";
  const main_content_info_seasons_container_info = createEl(
    "div",
    "main_content_info_seasons_container_info"
  );
  const main_content_info_seasons_container_title = createEl(
    "p",
    "main_content_info_seasons_container_title"
  );
  main_content_info_seasons_container_title.textContent =
    "Seasons: " + seasons.length;
  const main_content_info_seasons_container_subtitle = createEl(
    "p",
    "main_content_info_seasons_container_subtitle"
  );
  main_content_info_seasons_container_subtitle.textContent = status;
  main_content_info_seasons_container_info.append(
    main_content_info_seasons_container_title,
    main_content_info_seasons_container_subtitle
  );

  const main_content_info_seasons_container_content = createEl(
    "div",
    "main_content_info_seasons_container_content"
  );

  seasons.forEach((elem, index) => {
    const main_content_info_seasons_vertical = createEl(
      "div",
      "main_content_info_seasons_vertical"
    );

    const main_content_info_seasons_vertical_img = createEl(
      "div",
      "main_content_info_seasons_vertical_img"
    );
    const main_content_info_seasons_vertical_img_img = createEl("img");
    main_content_info_seasons_vertical_img_img.src =
      "https://image.tmdb.org/t/p/original/" + elem.poster_path;

    main_content_info_seasons_vertical_img_img.alt =
      "season " + index + "poster";
    main_content_info_seasons_vertical_img.append(
      main_content_info_seasons_vertical_img_img
    );

    const main_content_info_seasons_vertical_details = createEl(
      "div",
      "main_content_info_seasons_vertical_details"
    );

    const main_content_info_seasons_vertical_details_season = createEl(
      "p",
      "main_content_info_seasons_vertical_details_season"
    );

    main_content_info_seasons_vertical_details_season.textContent =
      "Number " + elem.season_number;

    const main_content_info_seasons_vertical_details_name = createEl(
      "p",
      "main_content_info_seasons_vertical_details_name"
    );
    main_content_info_seasons_vertical_details_name.textContent = elem.name;

    const main_content_info_seasons_vertical_details_air_date = createEl(
      "p",
      "main_content_info_seasons_vertical_details_air_date"
    );

    main_content_info_seasons_vertical_details_air_date.textContent =
      elem.air_date;

    const main_content_info_seasons_vertical_details_episodes = createEl(
      "p",
      "main_content_info_seasons_vertical_details_episodes"
    );
    main_content_info_seasons_vertical_details_episodes.textContent =
      elem.episode_count + " episodes";

    const main_content_info_seasons_vertical_details_overview = createEl(
      "p",
      "main_content_info_seasons_vertical_details_overview"
    );

    main_content_info_seasons_vertical_details_overview.textContent =
      elem.overview;

    const main_content_info_seasons_vertical_details_cta = createEl(
      "div",
      "main_content_info_seasons_vertical_details_cta"
    );

    main_content_info_seasons_vertical_details_cta.addEventListener(
      "click",
      () => {
        opendDetailedSeasonModal(elem, id);
      }
    );

    const main_content_info_seasons_vertical_details_cta_p = createEl("p");
    main_content_info_seasons_vertical_details_cta_p.textContent = "More";

    const main_content_info_seasons_vertical_details_cta_img = createEl("img");
    main_content_info_seasons_vertical_details_cta_img.src =
      "./Assets/icons8-forward-90-white.png";
    main_content_info_seasons_vertical_details_cta_img.alt = "More info img";
    main_content_info_seasons_vertical_details_cta.append(
      main_content_info_seasons_vertical_details_cta_p,
      main_content_info_seasons_vertical_details_cta_img
    );

    main_content_info_seasons_vertical_details.append(
      main_content_info_seasons_vertical_details_season,
      main_content_info_seasons_vertical_details_name,
      main_content_info_seasons_vertical_details_air_date,
      main_content_info_seasons_vertical_details_episodes,
      main_content_info_seasons_vertical_details_overview,
      main_content_info_seasons_vertical_details_cta
    );

    main_content_info_seasons_vertical.append(
      main_content_info_seasons_vertical_img,
      main_content_info_seasons_vertical_details
    );
    main_content_info_seasons_container_content.append(
      main_content_info_seasons_vertical
    );
  });

  element.append(
    main_content_info_seasons_container_info,
    main_content_info_seasons_container_content
  );
};

const createdByContainer = async (elem, { created_by }) => {
  console.log("createdByContainer . ", created_by);
  elem.textContent = "";
  const main_content_info_created_by_title = createEl(
    "p",
    "main_content_info_created_by_title"
  );
  main_content_info_created_by_title.textContent = "Created by:";
  elem.append(main_content_info_created_by_title);
  // ------
  created_by.forEach((creator) => {
    console.log("creator :", creator);
    const main_content_info_created_by = createEl(
      "div",
      "main_content_info_created_by"
    );
    const main_content_info_created_by_content = createEl(
      "div",
      "main_content_info_created_by_content"
    );
    const main_content_info_created_by_img = createEl(
      "div",
      "main_content_info_created_by_img"
    );

    const main_content_info_created_by_img_img = createEl("img");
    main_content_info_created_by_img_img.src =
      "https://image.tmdb.org/t/p/original/" + creator.profile_path;
    main_content_info_created_by_img_img.alt = "Img" + creator.name;

    main_content_info_created_by_img.append(
      main_content_info_created_by_img_img
    );
    // -----
    const main_content_info_created_by_info = createEl(
      "div",
      "main_content_info_created_by_info"
    );
    const main_content_info_created_by_info_p = createEl("p");
    main_content_info_created_by_info_p.textContent = creator.name;
    main_content_info_created_by_info.append(
      main_content_info_created_by_info_p
    );
    // ----
    main_content_info_created_by_content.append(
      main_content_info_created_by_img,
      main_content_info_created_by_info
    );

    main_content_info_created_by.append(main_content_info_created_by_content);
    //   FINAL
    elem.append(main_content_info_created_by);
  });
  created_by.length === 0 ? elem.append("No info about creator/s") : null;
};

// FUNCTIONS -------------------
const startVideoTrailer = (data) => {
  console.log("startVideoTrailer");
  displayVideoTrailer(data.url_trailer);
};

const opendDetailedSeasonModal = (data, idSeries) => {
  console.log("opendDetailedModal : ", data, idSeries);
  openModalEpisodes(data, idSeries);
};
