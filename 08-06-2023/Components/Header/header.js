import { getData } from "../../js/Utils/dbManager.js";
import { createEl, getEl } from "../../js/Utils/DOM.js";

// UI ELEMENT --------------------------
export let GenresData = [];

export const renderHeader = () => {
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

  const overlay_menu_header_avatar = createEl(
    "div",
    "overlay_menu_header_avatar"
  );

  const header_user = createEl("div", "header_user");
  const header_user_img = createEl("img");
  header_user_img.src = "./Assets/icons8-selfies-100-white.png";
  header_user_img.alt = "User avatar Icon - header";

  header_user.append(header_user_img);

  overlay_menu_header_avatar.append(header_user);

  const closebtn = createEl("div", "closebtn");
  closebtn.addEventListener("click", () => closeMenu());

  const closebtn_img = createEl("img");
  closebtn_img.src = "./Assets/icons8-close-90-white.png";
  closebtn_img.alt = "Close menu icon - header";

  closebtn.append(closebtn_img);

  overlay_menu_header.append(overlay_menu_header_avatar, closebtn);

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

  loadAllGenreList(overlay_content);

  const header_logo = createEl("div", "header_logo");
  const header_logo_img = createEl("img");
  header_logo_img.src = "./Assets/logo-esteso.png";
  header_logo_img.alt = "Wonderland logo header";
  header_logo.append(header_logo_img);
  // ---
  overlay_menu.append(overlay_menu_header, overlay_content);
  header_sx.append(menu_hamburger, overlay_menu, header_logo);
  // header_dx ------------
  const header_dx = createEl("div", "header_dx");
  const header_user_2 = createEl("div", "header_user");
  const header_user_2_img = createEl("img");
  header_user_2_img.src = "./Assets/icons8-selfies-100-white.png";
  header_user_2_img.alt = "User img profile";
  header_user_2.append(header_user_2_img);
  header_dx.append(header_user_2);
  // Append ---------------
  header.append(header_sx, header_dx);
  // RETURN --------------------
  return header;
};

// --------------------- ASYNC LOADING ------------------
export const getAllGeneres = async () => {
  let { genres } = await getData.genres();
  console.log(genres);
  GenresData = genres;
};
const loadAllGenreList = async (fatherToAppend) => {
  let { genres } = await getData.genres();
  console.log(genres);
  GenresData = genres;
  genres.forEach((element) => {
    const overlay_content_btn = createEl("div", "overlay_content_btn");

    const overlay_content_btn_p = createEl("p");
    overlay_content_btn_p.textContent = element.name;

    overlay_content_btn.addEventListener("click", () => {
      window.location.href = "tv-series-genre.html?id=" + element.id;
    });

    overlay_content_btn.append(overlay_content_btn_p);
    fatherToAppend.append(overlay_content_btn);
  });
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

// DATA----------------------------
const menuLinks = [
  {
    title: "Home",
    imgUrl: "./Assets/icons8-dashboard-90-white.png",
    alt: "Home icon",
    onclick: () => {
      window.location.href = "index.html";
    },
  },
  {
    title: "Top rated",
    imgUrl: "./Assets/icons8-trophy-90-white.png",
    alt: "Top rated icon",
    onclick: () => {
      window.location.href = "index.html";
    },
  },
  {
    title: "Popular",
    imgUrl: "./Assets/icons8-prize-90-white.png",
    alt: "Popular icon",
    onclick: () => {
      window.location.href = "index.html";
    },
  },
];
