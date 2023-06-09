import { getData } from "../../js/Utils/dbManager.js";
import { createEl, getEl } from "../../js/Utils/DOM.js";
import { menuLinks } from "../Menu/menu.js";
import { loaderSpinner } from "../LoaderSpinner/loaderSpinner.js";
import { openCardInfo } from "../Card_info/Card_info.js";

// UI ELEMENT --------------------------
export let GenresData = [];

export const renderHeader = (callback) => {
  const header = createEl("header");

  // header_sx ------------
  const header_sx = createEl("div", "header_sx");

  const menu_hamburger = createEl("div", "menu_hamburger");
  menu_hamburger.addEventListener("click", () => openMenu());

  const menu_hamburger_img = createEl("img");

  menu_hamburger_img.src = "./Assets/icons8-menu-rounded-100-white.png";
  menu_hamburger_img.alt = "Menu Hamburger Icon - header";
  menu_hamburger.append(menu_hamburger_img);
  // --
  const overlay_menu = createEl("div", "overlay_menu");

  const overlay_menu_header = createEl("div", "overlay_menu_header");

  const closebtn = createEl("div", "closebtn");
  closebtn.addEventListener("click", () => closeMenu());

  const closebtn_img = createEl("img");
  closebtn_img.src = "./Assets/icons8-close-90-white.png";
  closebtn_img.alt = "Close menu icon - header";

  closebtn.append(closebtn_img);

  overlay_menu_header.append(closebtn);

  // ---
  const overlay_content = createEl("div", "overlay_content");

  menuLinks.forEach((elem) => {
    const overlay_content_btn = createEl("div", "overlay_content_btn");
    const overlay_content_btn_img = createEl("img");
    overlay_content_btn_img.src = elem.imgUrl;
    overlay_content_btn_img.alt = elem.alt;

    const overlay_content_btn_p = createEl("p");
    overlay_content_btn_p.textContent = elem.title;

    overlay_content_btn.addEventListener("click", () => {
      elem.onclick();
    });

    overlay_content_btn.append(overlay_content_btn_img, overlay_content_btn_p);
    overlay_content.append(overlay_content_btn);
  });
  const separatorHR = createEl("hr");
  overlay_content.append(separatorHR);

  loadAllGenreList(overlay_content, callback);

  const header_logo = createEl("div", "header_logo");
  const header_logo_img = createEl("img");
  header_logo_img.src = "./Assets/logo-esteso.png";
  header_logo_img.alt = "Wonderland logo header";
  header_logo.append(header_logo_img);
  header_logo.addEventListener("click", () => {
    if (
      window.location.pathname === "/index.html" ||
      window.location.pathname === "/"
    ) {
    } else {
      window.location.href = "index.html";
    }
  });
  // ---
  overlay_menu.append(overlay_menu_header, overlay_content);
  header_sx.append(menu_hamburger, overlay_menu, header_logo);
  //---------------
  const header_dx = createEl("div", "header_dx");
  const header_dx_img = createEl("img", "header_dx_img");
  header_dx_img.src = "./Assets/icons8-cerca-di-più-90-white.png";
  header_dx_img.alt = "Search icon";

  header_dx.addEventListener("click", () => {
    openSearchModal();
  });

  // OVERLAY SEARCH ----
  const overlay_search = createEl("div", "overlay_search");

  const overlay_search_close = createEl("div", "overlay_search_close");

  const overlay_search_close_img = createEl("img", "overlay_search_close_img");
  overlay_search_close_img.src = "./Assets/icons8-close-90-white.png";
  overlay_search_close_img.alt = "Close Search icon";
  overlay_search_close.append(overlay_search_close_img);

  overlay_search_close.addEventListener("click", () => {
    closeSearchModal();
  });

  const overlay_search_input = createEl("input", "overlay_search_input");
  overlay_search_input.placeholder = "Search tv series";
  const overlay_search_button = createEl("div", "overlay_search_button");
  const overlay_search_button_text = createEl(
    "p",
    "overlay_search_button_text"
  );
  overlay_search_button_text.textContent = "Search";
  overlay_search_button.append(overlay_search_button_text);

  const overlay_search_response = createEl("div", "overlay_search_response");

  overlay_search_button.addEventListener("click", () => {
    startSearch(overlay_search_input, overlay_search_response);
  });

  overlay_search.append(
    overlay_search_close,
    overlay_search_input,
    overlay_search_button,
    overlay_search_response
  );
  // -------------
  header_dx.append(header_dx_img);
  // Append ---------------
  header.append(header_sx, header_dx, overlay_search);
  // RETURN --------------------
  return header;
};

// --------------------- ASYNC LOADING ------------------
export const getAllGeneres = async () => {
  let { genres } = await getData.genres();
  GenresData = genres;
};

const loadAllGenreList = async (fatherToAppend, callback) => {
  let { genres } = await getData.genres();
  GenresData = genres;
  genres.forEach((element) => {
    const overlay_content_btn = createEl("div", "overlay_content_btn");

    const overlay_content_btn_p = createEl("p");
    overlay_content_btn_p.textContent = element.name;

    overlay_content_btn.addEventListener("click", () => {
      window.location.href = "category.html?id=" + element.id;
    });

    overlay_content_btn.append(overlay_content_btn_p);
    fatherToAppend.append(overlay_content_btn);
  });
  callback(GenresData);
};

const startSearch = async (inputRef, containerRespRef) => {
  const valToSearch = inputRef.value;
  containerRespRef.textContent = "";
  containerRespRef.append(loaderSpinner());
  let { results } = await getData.searchTvSeries(valToSearch);
  console.log("RESP : ", results);
  setTimeout(() => {
    containerRespRef.textContent = "";
    const resVal = createEl("p", "containerRespRef");
    resVal.textContent = results.length + " results";
    containerRespRef.append(resVal);
    results.forEach((elem) => {
      containerRespRef.append(cardUIresp(elem));
    });
  }, 1000);
};

// UI RESP SEARCH -------------
const cardUIresp = (data) => {
  const cardUIresp = createEl("div", "cardUIresp");
  cardUIresp.addEventListener("click", () => {
    openCardInfo(data);
  });
  const cardUIresp_img = createEl("div", "cardUIresp_img");
  const cardUIresp_img_img = createEl("img");
  cardUIresp_img_img.src = "https://image.tmdb.org/t/p/w300" + data.poster_path;

  cardUIresp_img.append(cardUIresp_img_img);

  const cardUIresp_info = createEl("div", "cardUIresp_info");
  const cardUIresp_info_title = createEl("p", "cardUIresp_info_title");
  cardUIresp_info_title.textContent = data.name;

  const cardUIresp_info_vote_container = createEl(
    "div",
    "cardUIresp_info_vote_container"
  );
  const cardUIresp_info_vote_img = createEl("img", "cardUIresp_info_vote_img");
  cardUIresp_info_vote_img.src = "./Assets/icons8-star-90-white.png";
  cardUIresp_info_vote_img.alt = "Star icon";
  const cardUIresp_info_vote = createEl("p", "cardUIresp_info_vote");
  cardUIresp_info_vote.textContent = data.vote_average + " / 10";

  cardUIresp_info_vote_container.append(
    cardUIresp_info_vote_img,
    cardUIresp_info_vote
  );

  const cardUIresp_info_popularity = createEl(
    "p",
    "cardUIresp_info_popularity"
  );

  cardUIresp_info_popularity.textContent = "Popularity: " + data.popularity;

  cardUIresp_info.append(
    cardUIresp_info_title,
    cardUIresp_info_vote_container,
    cardUIresp_info_popularity
  );

  cardUIresp.append(cardUIresp_img, cardUIresp_info);
  return cardUIresp;
};

// Functions ----------------------
const openMenu = () => {
  let aux = getEl(".overlay_menu");
  aux.style.width = "100vw";
};
const closeMenu = () => {
  let aux = getEl(".overlay_menu");
  aux.style.width = "0";
};

const openSearchModal = () => {
  let aux = getEl(".overlay_search");
  console.log("OPENS");
  aux.style.width = "50vw";
};
const closeSearchModal = () => {
  let aux = getEl(".overlay_search");
  aux.style.width = "0";
};

const resetInput = () => {};

// DATA----------------------------
