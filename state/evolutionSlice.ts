import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SpeciesData = {
    evolution_chain: {
        url: string;
    };
};

interface EvolutionState {
    species: string;
    speciesData?: SpeciesData;
}

const initialState: EvolutionState = {
    species: "",
    speciesData: undefined,
};

export const evolutionSlice = createSlice({
    name: "evolution",
    initialState,
    reducers: {
        setSpecies: (state, action: PayloadAction<string>) => {
            state.species = action.payload;
        },
        setSpeciesData: (state, action: PayloadAction<SpeciesData>) => {
            state.speciesData = action.payload;
        },
    },
});

export const { setSpecies, setSpeciesData } = evolutionSlice.actions;

export const selectSpecies = (state: { evolution: EvolutionState }) =>
    state.evolution.species;
export const selectSpeciesData = (state: { evolution: EvolutionState }) =>
    state.evolution.speciesData;

export default evolutionSlice.reducer;
