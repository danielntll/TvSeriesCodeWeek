import { createEl } from "../../js/Utils/DOM.js";
import { GenresData } from "../Header/header.js";

// UI ELEMENT ------------------
export const ModalCardInfo = async (data = {}) => {
  const root = document.getElementById("root");
  // --------
  const cardInfo = createEl("div", "cardInfo");
  cardInfo.id = "cardInfo";

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
    goToTvSeriesPage(data.id);
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
  cardInfo_content_rating_p3.textContent = data.vote_count;

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

  const cardInfo_cta_container = createEl("div", "cardInfo_cta_container");
  const cardInfo_cta_1 = createEl("div", "cardInfo_cta");
  const cardInfo_cta_1_img = createEl("img");
  cardInfo_cta_1_img.src = "./Assets/icons8-play-90-white.png";
  cardInfo_cta_1_img.alt = "Web movie img";
  const cardInfo_cta_1_p = createEl("p");
  cardInfo_cta_1_p.textContent = "trailer";
  cardInfo_cta_1.append(cardInfo_cta_1_img, cardInfo_cta_1_p);

  cardInfo_cta_1.addEventListener("click", () => {
    startVideoTrailer(data);
  });

  const cardInfo_cta_2 = createEl("div", "cardInfo_cta");
  const cardInfo_cta2_img = createEl("img");
  cardInfo_cta2_img.src = "./Assets/icons8-website-90-white.png";
  cardInfo_cta2_img.alt = "Web movie img";
  const cardInfo_cta_2_p = createEl("p");
  cardInfo_cta_2_p.textContent = "official website";
  cardInfo_cta_2.append(cardInfo_cta2_img, cardInfo_cta_2_p);

  cardInfo_cta_2.addEventListener("click", () => {
    openOfficialSite(data);
  });

  cardInfo_cta_container.append(cardInfo_cta_1, cardInfo_cta_2);

  cardInfo_content.append(
    cardInfo_content_title,
    cardInfo_content_rating,
    hero_card_genre,
    cardInfo_description,
    cardInfo_cta_container
  );
  // APPEND-------------
  cardInfo.append(cardInfo_header, cardInfo_content_img, cardInfo_content);
  // RETURN ----------
  root.append(cardInfo);
};

// ASYNC FUNCTIONS -------------

// FUNCTIONS COMPONENT ---------
export const openCardInfo = async (data) => {
  console.log(data);
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
};

export const goToTvSeriesPage = (id) => {
  console.log("goToTvSeriesPage - id : ", id);
};
