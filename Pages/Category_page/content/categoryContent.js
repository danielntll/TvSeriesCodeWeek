import { loaderSpinner } from "../../../Components/LoaderSpinner/loaderSpinner.js";
import { getData } from "../../../js/Utils/dbManager.js";
import { createEl } from "../../../js/Utils/DOM.js";
import {
  renderSkeletonCardHorizontal,
  renderCardHorizontal,
} from "../../Home_page/components/horizontal_card/horizontal_card.js";

export const renderContent = (id, genresData) => {
  const category_content = createEl("div", "category_content");
  const category_content_title = createEl("h1", "category_content_title");
  console.log(genresData);
  const cat = genresData.filter((elem) => elem.id == id);
  console.log(cat);
  category_content_title.textContent = cat[0].name;

  const category_content_grid = createEl("div", "category_content_grid");
  category_content_grid.append(
    renderSkeletonCardHorizontal(),
    renderSkeletonCardHorizontal(),
    renderSkeletonCardHorizontal(),
    renderSkeletonCardHorizontal(),
    renderSkeletonCardHorizontal()
  );

  // APPEND -----
  category_content.append(category_content_title, category_content_grid);

  loadData(category_content_grid, id);

  return category_content;
};

const loadData = async (fatherToAppend, id) => {
  let currentIndexPage = 1;
  let loadingData = false;
  let result = await getData.tvSeriesByGenre(id, currentIndexPage);
  fatherToAppend.textContent = "";
  result.results.forEach((element) => {
    fatherToAppend.append(renderCardHorizontal(element));
  });

  if (fatherToAppend.offsetHeight < window.innerHeight) {
    fillPage(fatherToAppend, id, currentIndexPage);
  }

  onscroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      loadingData === false
    ) {
      loadingData = true;
      currentIndexPage++;
      const category_content =
        document.getElementsByClassName("category_content")[0];
      category_content.append(loaderSpinner());

      let newResult = await getData.tvSeriesByGenre(id, currentIndexPage);
      setTimeout(() => {
        const loader_container =
          document.getElementsByClassName("loader_container")[0];
        newResult.results.forEach((element) => {
          fatherToAppend.append(renderCardHorizontal(element));
        });
        loader_container.remove();
        loadingData = false;
      }, 1000);
    }
  };
};

const fillPage = async (fatherToAppend, id, currentIndexPage) => {
  console.log("fillPage");
  currentIndexPage++;
  let newResult = await getData.tvSeriesByGenre(id, currentIndexPage);
  newResult.results.forEach((element) => {
    fatherToAppend.append(renderCardHorizontal(element));
  });
  if (fatherToAppend.offsetHeight < window.innerHeight) {
    fillPage(fatherToAppend, id, currentIndexPage);
  } else {
    return console.log("PAGE FILLED");
  }
};
