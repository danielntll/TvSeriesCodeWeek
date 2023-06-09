import { getData } from "../../js/Utils/dbManager.js";
import { createEl } from "../../js/Utils/DOM.js";
import { writeLocal } from "../../js/Utils/localStoragemanage.js";
import { GenresData } from "../Header/header.js";
import { loaderSpinner } from "../LoaderSpinner/loaderSpinner.js";
import { Scroll_list } from "../Scroll_list/Scroll_list.js";
import { displayVideoTrailer } from "../VideoOverlay/VideoOvelay.js";

// UI ELEMENT ------------------
export const ModalCardInfo = async (data = {}) => {
  const root = document.getElementById("root");
  // --------

  const cardInfo = createEl("div", "cardInfo");
  cardInfo.id = "cardInfo";

  cardInfo.setAttribute(
    "style",
    `  background-image: url("https://image.tmdb.org/t/p/original/${data.poster_path}");
`
  );

  const cardInfo_header = createEl("div", "cardInfo_header");

  const cardInfo_header_sx = createEl("div", "cardInfo_header_sx");

  const cardInfo_header_close = createEl("div", "cardInfo_header_close");

  cardInfo_header_close.addEventListener("click", () => {
    closeCardInfo(cardInfo);
  });

  const cardInfo_header_close_img = createEl("img");
  cardInfo_header_close_img.src = "./Assets/icons8-close-90-white.png";
  cardInfo_header_close_img.alt = "Close modal img";

  cardInfo_header_close.append(cardInfo_header_close_img);

  const cardInfo_header_sx_p = createEl("p");
  cardInfo_header_sx_p.textContent = "Details";

  cardInfo_header_sx.append(cardInfo_header_close, cardInfo_header_sx_p);

  const cardInfo_header_dx = createEl("div", "cardInfo_header_dx");

  const cardInfo_header_btn = createEl("div", "cardInfo_header_btn");
  cardInfo_header_btn.textContent = "All information";

  const cardInfo_header_btn_img = createEl("img");
  cardInfo_header_btn_img.src = "./Assets/icons8-forward-90-white.png";
  cardInfo_header_btn_img.alt = "open page btn";
  cardInfo_header_btn.addEventListener("click", () => {
    goToTvSeriesPage(data);
  });
  cardInfo_header_btn.append(cardInfo_header_btn_img);

  cardInfo_header_dx.append(cardInfo_header_btn);
  cardInfo_header.append(cardInfo_header_sx, cardInfo_header_dx);

  // CONTENT ----------
  const cardInfo_content_img = createEl("div", "cardInfo_content_img");
  const cardInfo_content_img_img = createEl("img");
  cardInfo_content_img_img.src = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;
  cardInfo_content_img.append(cardInfo_content_img_img);

  // INFO CONTENT -----
  const cardInfo_content = createEl("div", "cardInfo_content");
  const cardInfo_content_title = createEl("div", "cardInfo_content_title");
  const cardInfo_content_title_p = createEl("p");
  cardInfo_content_title_p.textContent = data.name;
  cardInfo_content_title.append(cardInfo_content_title_p);

  const cardInfo_content_rating = createEl("div", "cardInfo_content_rating");
  const cardInfo_content_rating_img = createEl("img");
  cardInfo_content_rating_img.src = "./Assets/icons8-star-90-white.png";
  cardInfo_content_rating_img.alt = "Stars icon";

  const cardInfo_content_rating_p1 = createEl("p");
  const cardInfo_content_rating_p1_b = createEl("b");
  cardInfo_content_rating_p1_b.textContent = data.vote_average + " / 10";

  cardInfo_content_rating_p1.append(cardInfo_content_rating_p1_b);

  const cardInfo_content_rating_p2 = createEl("p");
  cardInfo_content_rating_p2.textContent = "|";
  const cardInfo_content_rating_p3 = createEl("p");
  cardInfo_content_rating_p3.textContent = data.vote_count + " votes";

  cardInfo_content_rating.append(
    cardInfo_content_rating_img,
    cardInfo_content_rating_p1,
    cardInfo_content_rating_p2,
    cardInfo_content_rating_p3
  );

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

  const cardInfo_description = createEl("div", "cardInfo_description");
  const cardInfo_description_p = createEl("p");
  cardInfo_description_p.textContent = data.overview;
  cardInfo_description.append(cardInfo_description_p);

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

  cardInfo_cta_container.append(cardInfo_cta);

  // CAST -------------
  const cardInfo_cast_wrapper = createEl("div", "cardInfo_cast_wrapper");
  cardInfo_cast_wrapper.id = "cardInfo_cast_wrapper";
  const cardInfo_cast = createEl("div", "cardInfo_cast");

  for (let index = 0; index < 4; index++) {
    cardInfo_cast.append(renderSkeleton());
  }

  cardInfo_cast_wrapper.append(cardInfo_cast);
  loadData(cardInfo_cast, data.id);

  cardInfo_content.append(
    cardInfo_content_title,
    cardInfo_content_rating,
    hero_card_genre,
    cardInfo_description,
    cardInfo_cta_container,
    cardInfo_cast_wrapper
  );
  // APPEND-------------
  const cardInfo_content_wrapping = createEl(
    "div",
    "cardInfo_content_wrapping"
  );
  cardInfo_content_wrapping.append(cardInfo_content_img, cardInfo_content);
  cardInfo.append(cardInfo_header, cardInfo_content_wrapping);
  // RETURN ----------
  root.append(cardInfo);
};

// SKELETON CARD -----------------
const renderSkeleton = () => {
  const skeleton = createEl("div", "cardInfo_cast_actor");

  skeleton.append(loaderSpinner());
  return skeleton;
};

// ASYNC FUNCTIONS -------------
const loadData = async (fatherToAppend, id) => {
  let { cast } = await getData.castAndCrew(id);
  setTimeout(() => {
    fatherToAppend.textContent = "";
    console.log("dataCrew : ", cast);
    cast.forEach((element) => {
      fatherToAppend.append(renderCastCard(element));
    });
    Scroll_list("cardInfo_cast_wrapper", true, true);
  }, 1000);
};

// CAST CARD UI ------------------
const renderCastCard = (data) => {
  const cardInfo_cast_actor = createEl("div", "cardInfo_cast_actor");
  const cardInfo_cast_actor_avatar = createEl(
    "div",
    "cardInfo_cast_actor_avatar"
  );
  const cardInfo_cast_actor_avatar_img = createEl("img");
  cardInfo_cast_actor_avatar_img.src =
    "https://image.tmdb.org/t/p/original/" + data.profile_path;
  cardInfo_cast_actor_avatar_img.alt = data.name + " avatar img";

  cardInfo_cast_actor_avatar.append(cardInfo_cast_actor_avatar_img);

  const cardInfo_cast_actor_info = createEl("div", "cardInfo_cast_actor_info");
  const cardInfo_cast_actor_info_p1 = createEl("p");
  cardInfo_cast_actor_info_p1.textContent = data.name;
  const cardInfo_cast_actor_info_p2 = createEl("p");
  const cardInfo_cast_actor_info_p2_b = createEl("b");
  cardInfo_cast_actor_info_p2_b.textContent = data.character;

  cardInfo_cast_actor_info_p2.append(cardInfo_cast_actor_info_p2_b);

  cardInfo_cast_actor_info.append(
    cardInfo_cast_actor_info_p1,
    cardInfo_cast_actor_info_p2
  );

  cardInfo_cast_actor.append(
    cardInfo_cast_actor_avatar,
    cardInfo_cast_actor_info
  );
  return cardInfo_cast_actor;
};

// FUNCTIONS COMPONENT ---------

export const openCardInfo = async (data) => {
  await ModalCardInfo(data);
  setTimeout(() => {
    let x = document.getElementById("cardInfo");
    x.style.height = "90vh";
    x.style.visibility = "visible";
  }, 100);
};
export const closeCardInfo = (cardInfo) => {
  let x = document.getElementById("cardInfo");
  x.style.height = "0";
  x.style.visibility = "hidden";
  setTimeout(() => {
    x.remove();
  }, 500);
};

const startVideoTrailer = (data) => {
  console.log("startVideoTrailer");
  displayVideoTrailer(data.url_trailer);
};

export const goToTvSeriesPage = (data) => {
  writeLocal.generalTvData(data);
  console.log("goToTvSeriesPage - id : ", data.id);
  window.location.href = "/tv-series.html?id=" + data.id + "&type=ref";
};
