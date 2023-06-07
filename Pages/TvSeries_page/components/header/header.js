import { createEl } from "../../../../js/Utils/DOM.js";

export const renderHeaderTvSeries = (previewData) => {
  console.log(previewData);
  // VARIABLES -------
  const header = createEl("header");

  const tv_header_wrapper = createEl("div", "tv_header_wrapper");
  const tv_header_sx = createEl("div", "tv_header_sx");
  const tv_header_back_btn = createEl("div", "tv_header_back_btn");
  tv_header_back_btn.addEventListener("click", () => {
    handleGoBack();
  });
  const tv_header_back_btn_img = createEl("img");
  tv_header_back_btn_img.src = "./Assets/icons8-back-90-white.png";
  tv_header_back_btn_img.alt = "Go back icon";
  // ---
  const tv_header_title = createEl("div", "tv_header_title");
  const tv_header_title_p = createEl("p");
  tv_header_title_p.textContent = previewData.name;
  // ---
  const tv_header_share_btn = createEl("div", "tv_header_share_btn");
  tv_header_share_btn.addEventListener("click", () => {
    handleShareTvShow(previewData);
  });
  const tv_header_share_btn_img = createEl("img");

  tv_header_share_btn_img.src =
    "./Assets/icons8-condividi-arrotondato-90-white.png";
  tv_header_share_btn_img.alt = "share icon";
  // APPEND -----
  tv_header_share_btn.append(tv_header_share_btn_img);
  tv_header_title.append(tv_header_title_p);
  tv_header_back_btn.append(tv_header_back_btn_img);
  tv_header_sx.append(tv_header_back_btn, tv_header_title);
  tv_header_wrapper.append(tv_header_sx, tv_header_share_btn);
  header.append(tv_header_wrapper);
  // RETURN ----------
  return header;
};

// FUNCTIONS --------
const handleGoBack = () => {
  console.log("handleGoBack");
  history.back();
};
const handleShareTvShow = (previewData) => {
  console.log("handleShareTvShow");
};
