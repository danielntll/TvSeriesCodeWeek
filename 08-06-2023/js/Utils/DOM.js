export const createEl = (element, className = "") => {
  let aux = document.createElement(element);
  aux.className = className;
  return aux;
};

export const getEl = (element) => document.querySelector(element);
