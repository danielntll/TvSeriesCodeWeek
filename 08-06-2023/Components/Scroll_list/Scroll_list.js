import { createEl } from "../../js/Utils/DOM.js";

export const Scroll_list = (father) => {
  console.log(father);
  let scrollList = document.getElementById(father);
  console.log(scrollList);
  let card = scrollList.firstChild.firstChild;
  console.log("CARD : ", card);
  const scrollStep = card.offsetWidth;

  const scrollList_w = scrollList.offsetWidth;
  const scrollList_y = scrollList.offsetHeight;
  const scroll_list_container = createEl("div", "scroll_list_container");

  const scroll_list_container_sx = createEl("div", "scroll_list_container_sx");

  const scroll_list_container_sx_img = createEl("img");
  scroll_list_container_sx_img.src = "./Assets/icons8-back-90-white.png";
  scroll_list_container_sx.append(scroll_list_container_sx_img);

  const scroll_list_container_dx = createEl("div", "scroll_list_container_dx");
  const scroll_list_container_dx_img = createEl("img");
  scroll_list_container_dx_img.src = "./Assets/icons8-forward-90-white.png";
  scroll_list_container_dx.append(scroll_list_container_dx_img);

  let currentScroll = 0;
  const maxScoll =
    (scrollStep + 10) * scrollList.firstChild.children.length - scrollList_w;

  scroll_list_container_sx.addEventListener("click", () => {
    console.log("SCROLL");
    if (currentScroll !== 0) {
      currentScroll -= scrollStep;
      console.log(currentScroll);
      scrollList.firstChild.scrollTo({
        left: currentScroll,
        behavior: "smooth",
      });
    }
  });
  scroll_list_container_dx.addEventListener("click", () => {
    console.log("SCROLL");
    if (currentScroll < maxScoll) {
      currentScroll += scrollStep;
      console.log(currentScroll);
      scrollList.firstChild.scrollTo({
        left: currentScroll,
        behavior: "smooth",
      });
    }
  });

  scroll_list_container.append(
    scroll_list_container_sx,
    scroll_list_container_dx
  );

  scrollList.append(scroll_list_container);
  scroll_list_container.style.height = scrollList_y + "px";

  scrollList.addEventListener("mouseover", () => {
    scroll_list_container.style.opacity = 1;
    scroll_list_container.style.display = "flex";
  });
  scrollList.addEventListener("mouseout", () => {
    scroll_list_container.style.opacity = 0;
    scroll_list_container.style.display = "none";
  });

  return;
};
