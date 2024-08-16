import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import searchPokemonReducer from "./searchPokemonSlice";
import movesReducer from "./moveSlice";
import viewReducer from "./viewSlice";
import evolutionReducer from "./evolutionSlice";
import teamReducer from "./teamSlice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        search: searchPokemonReducer,
        view: viewReducer,
        movesView: movesReducer,
        evolution: evolutionReducer,
        team: teamReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
