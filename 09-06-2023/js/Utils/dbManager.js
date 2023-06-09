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
    console.log("getData - topRated(): ->", data);
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
    console.log("getData - popular(): ->", data);
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
    console.log("getData - onTheAir(): ->", data);
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
    console.log("getData - airingToday(): ->", data);
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
    console.log("getData - genres(): ->", data);

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
    console.log("getData - castAndCrew(): ->", data);
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
    console.log("getData - person(): ->", data);
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
    console.log("getData - seriesDetails(): ->", data);
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
    console.log("getData - seasonDetails(): ->", data);
    return data;
  },
  tvSeriesByGenre: async (genreId, pageNumber) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNumber}`,
      options
    );
    let data = await res.json();
    console.log("getData - tvSeriesByGenre(): ->", data);
    return data;
  },
  searchTvSeries: async (searchInput) => {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    let res = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchInput}`,
      options
    );
    let data = await res.json();
    console.log("getData - searchTvSeries(): ->", data);
    return data;
  },
};
