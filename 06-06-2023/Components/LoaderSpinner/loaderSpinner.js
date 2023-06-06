import { createEl } from "../../js/Utils/DOM.js";

export const loaderSpinner = () => {
  const loader_container = createEl("div", "loader_container");

  const lds_roller = createEl("div", "lds-roller");

  for (let index = 0; index < 6; index++) {
    const div = createEl("div");
    lds_roller.append(div);
  }

  lds_roller.append();
  loader_container.append(lds_roller);
  return loader_container;
};
