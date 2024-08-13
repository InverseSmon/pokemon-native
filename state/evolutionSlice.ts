import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SpeciesData = {
    evolution_chain: {
        url: string;
    };
};

export type EvolutionChain = {
    chain: {
        evolution_details: {
            min_level: number;
            trigger: {
                name: string;
            };
        }[];
        species: {
            name: string;
        };
        evolves_to: {
            species: {
                name: string;
            };
            evolution_details: {
                min_level: number;
                trigger: {
                    name: string;
                };
            }[];
            evolves_to: {
                species: {
                    name: string;
                };
                evolution_details: {
                    min_level: number;
                    trigger: {
                        name: string;
                    };
                }[];
            }[];
        }[];
    };
};

interface EvolutionState {
    species: string;
    speciesData?: SpeciesData;
    evolutionChain?: EvolutionChain;
}

const initialState: EvolutionState = {
    species: "",
    speciesData: undefined,
    evolutionChain: undefined,
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
        setEvolutionChain: (state, action: PayloadAction<EvolutionChain>) => {
            state.evolutionChain = action.payload;
        },
    },
});

export const { setSpecies, setSpeciesData, setEvolutionChain } =
    evolutionSlice.actions;

export const selectSpecies = (state: { evolution: EvolutionState }) =>
    state.evolution.species;
export const selectSpeciesData = (state: { evolution: EvolutionState }) =>
    state.evolution.speciesData;
export const selectEvolutionChain = (state: { evolution: EvolutionState }) =>
    state.evolution.evolutionChain;

export default evolutionSlice.reducer;
