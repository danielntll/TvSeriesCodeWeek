import { writeLocal } from "./localStoragemanage.js";

const API_KEY = "7a6a75072fa837ab91b58a431dc38704";

export const getData = {
  topRated: async (pageNumber = 1) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    let res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${pageNumber}`,
      options
    );
    let data = await res.json();
    return data;
  },
  popular: async (pageNumber = 1) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    let res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${pageNumber}`,
      options
    );
    let data = await res.json();
    console.log("POPULAR : ", data);
    return data;
  },
  onTheAir: async (pageNumber = 1) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    let res = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&page=${pageNumber}`,
      options
    );
    let data = await res.json();
    console.log("onTheAir : ", data);
    return data;
  },
  airingToday: async (pageNumber = 1) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    let res = await fetch(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&page=${pageNumber}`,
      options
    );
    let data = await res.json();
    return data;
  },
  genres: async () => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    let res = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`,
      options
    );
    let data = await res.json();
    return data;
  },
  castAndCrew: async (idSeries) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3/tv/${idSeries}/credits?api_key=${API_KEY}`,
      options
    );
    let data = await res.json();
    writeLocal.castAndCrew(data);
    return data;
  },
  person: async (idPerson) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3/person/${idPerson}?api_key=${API_KEY}`,
      options
    );
    let data = await res.json();
    writeLocal.castAndCrew(data);
    return data;
  },
  seriesDetails: async (idSeries) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3/tv/${idSeries}?api_key=${API_KEY}`,
      options
    );
    let data = await res.json();
    return data;
  },
  seasonDetails: async (idSeries, seasonNumber) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3/tv/${idSeries}/season/${seasonNumber}?api_key=${API_KEY}`,
      options
    );
    let data = await res.json();
    return data;
  },
};
