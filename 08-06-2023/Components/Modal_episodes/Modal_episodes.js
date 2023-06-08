import { getData } from "../../js/Utils/dbManager.js";
import { createEl } from "../../js/Utils/DOM.js";
import { loaderSpinner } from "../LoaderSpinner/loaderSpinner.js";

// UI ELEMENT ------------------
export const ModalEpisodes = async (data = {}, idSeries) => {
  const root = document.getElementById("root");
  // --------
  const cardInfo = createEl("div", "cardInfo");
  cardInfo.id = "ModalEpisodes";

  cardInfo.setAttribute(
    "style",
    `  background-image: url("https://image.tmdb.org/t/p/original/${data.poster_path}");
`
  );

  const cardInfo_header = createEl("div", "cardInfo_header");

  const cardInfo_header_sx = createEl("div", "cardInfo_header_sx");

  const cardInfo_header_close = createEl("div", "cardInfo_header_close");

  cardInfo_header_close.addEventListener("click", () => {
    closeModalEpisodes(cardInfo);
  });

  const cardInfo_header_close_img = createEl("img");
  cardInfo_header_close_img.src = "./Assets/icons8-close-90-white.png";
  cardInfo_header_close_img.alt = "Close modal img";

  cardInfo_header_close.append(cardInfo_header_close_img);

  const cardInfo_header_sx_p = createEl("p");
  cardInfo_header_sx_p.textContent = data.name;

  cardInfo_header_sx.append(cardInfo_header_close, cardInfo_header_sx_p);

  cardInfo_header.append(cardInfo_header_sx);

  // CONTENT ----------
  const cardInfo_content_wrapping = createEl(
    "div",
    "cardInfo_content_wrapping"
  );
  cardInfo_content_wrapping.append(seasonDetails(data));

  //   -----

  cardInfo.append(
    cardInfo_header,
    cardInfo_content_wrapping,
    skeletonEpisode()
  );

  loadEpisodesData(
    data,
    idSeries,
    cardInfo,
    cardInfo_header,
    cardInfo_content_wrapping
  );

  // RETURN ----------
  root.append(cardInfo);
};

// -------------------------------------------------------------------
// ASYNC LOAD ---------
const loadEpisodesData = async (
  data,
  idSeries,
  cardInfo,
  cardInfo_header,
  cardInfo_content_wrapping
) => {
  const seasonDetails = await getData.seasonDetails(
    idSeries,
    data.season_number
  );
  console.log("loadEpisodesData : ", seasonDetails);
  cardInfo.textContent = "";

  seasonDetails.episodes.forEach((element) => {
    cardInfo_content_wrapping.append(episodeCard(element));
  });
  cardInfo.append(cardInfo_header, cardInfo_content_wrapping);
};

// SKELETON ---------
const skeletonEpisode = () => {
  const skeletonEpisode_content_wrapping = createEl(
    "div",
    "modaleEpisode_content_wrapping"
  );
  const skeletonEpisode = createEl("div", "cardInfo_content");
  skeletonEpisode.append(loaderSpinner());
  skeletonEpisode_content_wrapping.append(skeletonEpisode);
  return skeletonEpisode_content_wrapping;
};
// UI ------------------
const seasonDetails = (data) => {
  const modaleEpisode_content = createEl("div", "cardInfo_content");
  const modaleEpisode_content_air_date_container = createEl(
    "div",
    "modaleEpisode_content_air_date_container"
  );
  const modaleEpisode_content_air = createEl(
    "p",
    "modaleEpisode_content_air_date"
  );
  modaleEpisode_content_air.textContent = "Air date: ";

  const modaleEpisode_content_air_date = createEl(
    "p",
    "modaleEpisode_content_air_date"
  );
  modaleEpisode_content_air_date.textContent = data.air_date;

  modaleEpisode_content_air_date_container.append(
    modaleEpisode_content_air,
    modaleEpisode_content_air_date
  );

  const modaleEpisode_content_overview = createEl(
    "p",
    "modaleEpisode_content_overview"
  );
  modaleEpisode_content_overview.textContent = data.overview
    ? data.overview
    : "No overview info";

  modaleEpisode_content.append(
    modaleEpisode_content_air_date_container,
    modaleEpisode_content_overview
  );
  return modaleEpisode_content;
};

const episodeCard = (data) => {
  const episodeCard = createEl("div", "cardInfo_content");
  // ---------  IMG
  const episodeCard_img = createEl("div", "episodeCard_img");
  const episodeCard_img_img = createEl("img");
  episodeCard_img_img.src =
    "https://image.tmdb.org/t/p/w300/" + data.still_path;
  episodeCard_img_img.alt = "Episode " + data.episode_number + " img";
  episodeCard_img.append(episodeCard_img_img);
  // --------- AIR DATE
  const modaleEpisode_content_air_date_container = createEl(
    "div",
    "modaleEpisode_content_air_date_container"
  );
  const modaleEpisode_content_air = createEl(
    "p",
    "modaleEpisode_content_air_date"
  );
  modaleEpisode_content_air.textContent = data.episode_number
    ? "Episode: " + data.episode_number
    : "No episode number info";

  const modaleEpisode_content_air_date = createEl(
    "p",
    "modaleEpisode_content_air_date"
  );
  modaleEpisode_content_air_date.textContent = data.air_date
    ? data.air_date
    : "No air date info";

  modaleEpisode_content_air_date_container.append(
    modaleEpisode_content_air,
    modaleEpisode_content_air_date
  );
  // ------ TITLE
  const modaleEpisode_content_title = createEl(
    "p",
    "modaleEpisode_content_title"
  );
  modaleEpisode_content_title.textContent = data.name
    ? data.name
    : "No name info";

  //   ----- OVERVIEW
  const modaleEpisode_content_overview = createEl(
    "p",
    "modaleEpisode_content_overview"
  );
  modaleEpisode_content_overview.textContent = data.overview
    ? data.overview
    : "No overview info";
  // ------  APPEND
  episodeCard.append(
    episodeCard_img,
    modaleEpisode_content_air_date_container,
    modaleEpisode_content_title,
    modaleEpisode_content_overview
  );
  return episodeCard;
};

// FUNCTIONS COMPONENT ---------
export const openModalEpisodes = async (data, idSeries) => {
  await ModalEpisodes(data, idSeries);
  setTimeout(() => {
    let x = document.getElementById("ModalEpisodes");
    x.style.height = "90vh";
    x.style.visibility = "visible";
  }, 100);
};
export const closeModalEpisodes = (cardInfo) => {
  let x = document.getElementById("ModalEpisodes");
  x.style.height = "0";
  x.style.visibility = "hidden";
  setTimeout(() => {
    x.remove();
  }, 500);
};
