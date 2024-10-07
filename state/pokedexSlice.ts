import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokedexState {
    currentGeneration: number[];
    largeCard: number;
}

const initialState: PokedexState = {
    currentGeneration: Array.from({ length: 151 }, (_, i) => i + 1),
    largeCard: 0,
};

export const pokedexSlice = createSlice({
    name: "pokedex",
    initialState,
    reducers: {
        setGeneration: (state, action: PayloadAction<number[]>) => {
            state.currentGeneration = action.payload;
        },
        setLargeCard: (state, action: PayloadAction<number>) => {
            state.largeCard = action.payload;
        },
    },
});

export const { setGeneration, setLargeCard } = pokedexSlice.actions;

export const selectGeneration = (state: { pokedex: PokedexState }) =>
    state.pokedex.currentGeneration;
export const selectLargeCard = (state: { pokedex: PokedexState }) =>
    state.pokedex.largeCard;

export default pokedexSlice.reducer;
