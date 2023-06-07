// IMPORT
import { getAllGeneres } from "../../Components/Header/header.js";
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
  const root = getEl("#root");
  const previewData = readLocal.generalTvData();

  // UI ELEMENTS --------------------
  await getAllGeneres();
  // Header
  root.append(renderHeaderTvSeries(previewData));
  // Content
  root.append(renderMainContentTvShow(previewData, root));
  // RETURN ---------------------------
  return callback();
};

renderTvSeriesPage();
// FUNCTIONS ------------
