import { useGetPokemonByNameQuery } from "./api/extended";

export default function Pokemon({ name }: { name: string }) {
  const { data, isLoading, isFetching, error, refetch } =
    useGetPokemonByNameQuery(name);

  return (
    <div style={{ float: "left", textAlign: "center" }}>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <div>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </div>
          <div>
            <button onClick={refetch} disabled={isFetching}>
              {isFetching ? "Fetching..." : "Refetch"}
            </button>
          </div>
        </>
      ) : (
        "No Data"
      )}
    </div>
  );
}
