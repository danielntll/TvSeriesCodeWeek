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
};
