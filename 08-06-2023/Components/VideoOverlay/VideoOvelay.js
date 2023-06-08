import { createEl } from "../../js/Utils/DOM.js";

export const displayVideoTrailer = (url) => {
  const root = document.getElementById("root");

  const overlay_container = createEl("div", "overlay_container");
  overlay_container.addEventListener("click", () => {
    removeVideo(overlay_container);
  });
  const overlay_container_header = createEl("div", "overlay_container_header");
  const overlay_container_header_close = createEl(
    "div",
    "overlay_container_header_close"
  );
  overlay_container_header_close.addEventListener("click", () => {
    removeVideo(overlay_container);
  });
  const overlay_container_header_close_img = createEl("img");
  overlay_container_header_close_img.src = "./Assets/icons8-close-90-white.png";
  overlay_container_header_close_img.alt = "Close video";

  //   -------
  const overlay_container_iFrame = createEl(
    "iframe",
    "overlay_container_iFrame"
  );
  overlay_container_iFrame.src = url
    ? url
    : "https://www.youtube.com/embed/cJQvyXKtxiU?rel=0&amp;showinfo=0";

  overlay_container_iFrame.setAttribute("allowfullscreen", "true");

  overlay_container_header_close.append(overlay_container_header_close_img);
  overlay_container_header.append(overlay_container_header_close);
  overlay_container.append(overlay_container_header, overlay_container_iFrame);
  root.append(overlay_container);
};

// FUNCIONS -------
const removeVideo = (element) => {
  element.remove();
};
