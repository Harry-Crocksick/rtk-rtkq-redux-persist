import { pokemonApi } from "./pokemon";

export const extendedApi = pokemonApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `/pokemon/${name}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPokemonByNameQuery } = extendedApi;
