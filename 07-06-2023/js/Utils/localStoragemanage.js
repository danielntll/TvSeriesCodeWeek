export const writeLocal = {
  castAndCrew: (data) => {
    localStorage.setItem("castAndCrew", JSON.stringify(data));
  },
  generalTvData: (data) => {
    localStorage.setItem("generalTvData", JSON.stringify(data));
  },
};

export const readLocal = {
  castAndCrew: () => {
    const data = localStorage.getItem("castAndCrew");
    return JSON.parse(data);
  },
  generalTvData: () => {
    const data = localStorage.getItem("generalTvData");
    return JSON.parse(data);
  },
};
