import React, { useState, useEffect } from "react";
import Pokemon from "./pokemon";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "./features/counter/counterSlice";
import { useAppSelector, useAppDispatch } from "./hooks";

const spanStyles: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "1.5rem",
  fontFamily: "monospace",
};

export default function App() {
  const [pokemons, setPokemons] = useState<string[]>(["bulbasaur"]);

  useEffect(() => {
    setTimeout(() => {
      setPokemons((prev) => [...prev, "bulbasaur"]);
    }, 1500);

    setTimeout(() => {
      setPokemons((prev) => [...prev, "pikachu"]);
    }, 3000);
  }, []);

  return (
    <section>
      <div style={{ display: "flex", columnGap: "1.25rem" }}>
        <button onClick={() => setPokemons((prev) => [...prev, "raichu"])}>
          Add Raichu
        </button>
        <Counter />
      </div>
      {pokemons.map((name, index) => (
        <Pokemon key={index} name={name} />
      ))}
    </section>
  );
}

function Counter() {
  const [input, setInput] = useState("");
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <button onClick={() => dispatch(increment())}>increment</button>
      <span style={spanStyles}>{count}</span>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(reset())}>reset</button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => dispatch(incrementByAmount(input))}>
        incrementByAmount
      </button>
    </>
  );
}
