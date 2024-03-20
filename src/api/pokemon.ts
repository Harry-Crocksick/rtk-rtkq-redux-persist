import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemon",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  tagTypes: ["Post"],
  keepUnusedDataFor: 100,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  endpoints: () => ({}),
});
