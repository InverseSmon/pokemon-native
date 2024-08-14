import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonMove } from "@/components/MovesView";

export type PokemonData = {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
        };
    }[];
    moves: PokemonMove[];
    species: {
        name: string;
    };
    sprites: {
        front_default: string;
    };
    types: {
        0: {
            type: {
                name: string;
            };
        };
        1: {
            type: {
                name: string;
            };
        };
    };
};

interface PokemonState {
    pokemon: PokemonData | null;
}

const initialState: PokemonState = {
    pokemon: null,
};

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        addPokemon: (state, action: PayloadAction<PokemonData>) => {
            state.pokemon = action.payload;
        },
    },
});

export const { addPokemon } = pokemonSlice.actions;

export const selectPokemon = (state: {
    pokemon: { pokemon: PokemonData | null };
}) => state.pokemon.pokemon;

export default pokemonSlice.reducer;
