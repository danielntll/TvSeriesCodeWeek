import { createEl } from "../../js/Utils/DOM.js";

export const Scroll_list = (
  father,
  scrollWidth = false,
  widthAjust = false,
  gapCard = 10
) => {
  const GAP_CARD = gapCard;
  let scrollList = document.getElementById(father);
  let card = scrollList.firstChild.firstChild;

  const scrollList_w = scrollList.offsetWidth;

  const scroll_list_container_sx = createEl("div", "scroll_list_container_sx");
  const scroll_list_container_sx_img_cont = createEl(
    "div",
    "scroll_list_container_img_cont"
  );

  const scroll_list_container_sx_img = createEl("img");
  scroll_list_container_sx_img.src = "./Assets/icons8-back-90-white.png";
  scroll_list_container_sx.append(scroll_list_container_sx_img_cont);
  scroll_list_container_sx_img_cont.append(scroll_list_container_sx_img);
  const scroll_list_container_dx_img_cont = createEl(
    "div",
    "scroll_list_container_img_cont"
  );

  const scroll_list_container_dx = createEl("div", "scroll_list_container_dx");
  const scroll_list_container_dx_img = createEl("img");
  scroll_list_container_dx_img.src = "./Assets/icons8-forward-90-white.png";
  scroll_list_container_dx_img_cont.append(scroll_list_container_dx_img);

  scroll_list_container_dx.append(scroll_list_container_dx_img_cont);

  const scrollStep = scrollWidth ? scrollList_w : card.offsetWidth;
  let currentScroll = 0;

  scrollList.firstChild.addEventListener(
    "scroll",
    () => {
      currentScroll = scrollList.firstChild.scrollLeft;
      if (
        scrollList.firstChild.scrollWidth -
          scrollList.firstChild.offsetWidth !==
        currentScroll
      ) {
        scroll_list_container_dx.style.opacity = 1;
        scroll_list_container_dx.style.display = "flex";
      } else {
        scroll_list_container_dx.style.opacity = 0;
        scroll_list_container_dx.style.display = "none";
      }
      if (currentScroll !== 0) {
        scroll_list_container_sx.style.opacity = 1;
        scroll_list_container_sx.style.display = "flex";
      } else {
        scroll_list_container_sx.style.opacity = 0;
        scroll_list_container_sx.style.display = "none";
      }
    },
    { passive: true }
  );

  scroll_list_container_sx.addEventListener("click", () => {
    let aux = currentScroll - (scrollStep + GAP_CARD);
    scrollList.firstChild.scrollTo({
      left: aux,
      behavior: "smooth",
    });
  });
  scroll_list_container_dx.addEventListener("click", () => {
    let aux = currentScroll + (scrollStep + GAP_CARD);
    scrollList.firstChild.scrollTo({
      left: aux,
      behavior: "smooth",
    });
  });

  //   --------

  scrollList.append(scroll_list_container_sx);
  scrollList.append(scroll_list_container_dx);

  //  ------

  scrollList.addEventListener("mouseover", () => {
    if (currentScroll !== 0) {
      scroll_list_container_sx.style.opacity = 1;
      scroll_list_container_sx.style.display = "flex";
    }

    if (
      scrollList.firstChild.scrollWidth - scrollList.firstChild.offsetWidth !==
      currentScroll
    ) {
      scroll_list_container_dx.style.opacity = 1;
      scroll_list_container_dx.style.display = "flex";
    }
  });
  scrollList.addEventListener("mouseout", () => {
    scroll_list_container_sx.style.opacity = 0;
    scroll_list_container_sx.style.display = "none";

    scroll_list_container_dx.style.opacity = 0;
    scroll_list_container_dx.style.display = "none";
  });

  return;
};
