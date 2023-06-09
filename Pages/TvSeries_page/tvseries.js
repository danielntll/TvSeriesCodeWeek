// IMPORT
import { getAllGeneres } from "../../Components/Header/header.js";
import { Scroll_list } from "../../Components/Scroll_list/Scroll_list.js";
import { getData } from "../../js/Utils/dbManager.js";
import { getEl } from "../../js/Utils/DOM.js";
import { readLocal } from "../../js/Utils/localStoragemanage.js";
import { renderMainContentTvShow } from "./components/content/content.js";
import { renderHeaderTvSeries } from "./components/header/header.js";

// RENDER -----------------
export const renderTvSeriesPage = async (
  callback = () => {
    console.log("renderTvSeriesPage - DONE.");
  }
) => {
  // VARIABLES ----------------------
  let url = document.location.search;
  url = url.split("&");
  if (url.length > 1) {
    console.log("---------- PER RIFERIMENTO");
    const root = getEl("#root");
    const previewData = readLocal.generalTvData();
    const castAndCrew = readLocal.castAndCrew();
    // UI ELEMENTS --------------------
    await getAllGeneres();
    // Header
    root.append(renderHeaderTvSeries(previewData));
    // Content
    root.append(renderMainContentTvShow(previewData, castAndCrew, root));
  } else {
    console.log("---------- DA LINK CONDIVISO");
    let id = url[0].split("=")[1];
    // console.log(id);
    const root = getEl("#root");
    const previewData = await getData.seriesDetails(id);
    // console.log(previewData);
    const castAndCrew = await getData.castAndCrew(id);
    // console.log(castAndCrew);
    // UI ELEMENTS --------------------
    const aux = await getAllGeneres();
    // console.log(aux);
    // Header
    root.append(renderHeaderTvSeries(previewData));
    // Content
    root.append(renderMainContentTvShow(previewData, castAndCrew, root));
  }

  Scroll_list("cardInfo_cast_container");
  // RETURN ---------------------------
  return callback();
};

renderTvSeriesPage();
// FUNCTIONS ------------
