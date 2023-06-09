import { BASE_PATH } from "../../js/app.js";

export const menuLinks = [
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
      window.location.href = BASE_PATH + "/category.html?explore=topRated()";
    },
  },
  {
    title: "Popular",
    imgUrl: "./Assets/icons8-prize-90-white.png",
    alt: "Popular icon",
    onclick: () => {
      window.location.href = BASE_PATH + "/category.html?explore=popular()";
    },
  },
  {
    title: "On the air",
    imgUrl: "./Assets/icons8-live-video-on-90-white.png",
    alt: "Popular icon",
    onclick: () => {
      window.location.href = BASE_PATH + "/category.html?explore=onTheAir()";
    },
  },
  {
    title: "Airing today",
    imgUrl: "./Assets/icons8-collegato-90-white.png",
    alt: "Popular icon",
    onclick: () => {
      window.location.href = BASE_PATH + "/category.html?explore=airingToday()";
    },
  },
];
