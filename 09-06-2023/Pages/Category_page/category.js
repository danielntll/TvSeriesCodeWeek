import { GenresData, renderHeader } from "../../Components/Header/header.js";
import { getData } from "../../js/Utils/dbManager.js";
import { getEl } from "../../js/Utils/DOM.js";
import { renderContent } from "./content/categoryContent.js";
import { renderExploreContent } from "./content/exploreContent.js";

export const renderCategoryPage = (
  callback = () => {
    console.log("renderCategoryPage - DONE.");
  }
) => {
  // VARIABLES ----------------------
  const root = getEl("#root");
  let url = document.location.search;
  console.log(url);

  if (url.split("=")[0] !== "?explore") {
    let id = url.split("=")[1];
    console.log("URL ID:", id);

    // UI ELEMENTS --------------------
    // Header
    root.append(
      renderHeader((genresData) => callbackContent(root, id, genresData))
    );
    // CONTENT

    // RETURN ---------------------------
    return callback();
  } else {
    let id = url.split("=")[1];
    console.log("URL ID:", id);

    switch (id) {
      case "topRated()":
        root.append(
          renderHeader((genresData) =>
            callbackContentExplore("Top Rated", (page) =>
              getData.topRated(page)
            )
          )
        );
        break;
      case "airingToday()":
        root.append(
          renderHeader((genresData) =>
            callbackContentExplore("Airing Today", (page) =>
              getData.airingToday(page)
            )
          )
        );
        break;
      case "onTheAir()":
        root.append(
          renderHeader((genresData) =>
            callbackContentExplore("On The Air", (page) =>
              getData.onTheAir(page)
            )
          )
        );
        break;
      case "popular()":
        root.append(
          renderHeader((genresData) =>
            callbackContentExplore("Popular", (page) => getData.popular(page))
          )
        );
        break;

      default:
        break;
    }

    // RETURN ---------------------------
    return callback();
  }
};

const callbackContent = (root, id, genresData) => {
  root.append(renderContent(id, genresData));
};

const callbackContentExplore = (title, callbackFetch) => {
  root.append(renderExploreContent(title, (page) => callbackFetch(page)));
};

renderCategoryPage();
// FUNCTIONS ------------
