import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonData } from "./pokemonSlice";

interface TeamState {
    team: PokemonData[];
    modalPokemon: PokemonData | null;
    modalView: boolean;
}

const initialState: TeamState = {
    team: [],
    modalPokemon: null,
    modalView: false,
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        addPlayer: (state, action: PayloadAction<PokemonData>) => {
            state.team.push(action.payload);
        },
        removePlayer: (state, action: PayloadAction<number>) => {
            state.team.splice(action.payload, 1);
        },
        setModalView: (state, action: PayloadAction<boolean>) => {
            state.modalView = action.payload;
        },
        setModalPokemon: (state, action: PayloadAction<PokemonData>) => {
            state.modalPokemon = action.payload;
        },
    },
});

export const { addPlayer, removePlayer, setModalView, setModalPokemon } =
    teamSlice.actions;

export const selectTeam = (state: { team: TeamState }) => state.team.team;

export const selectModalView = (state: { team: TeamState }) =>
    state.team.modalView;

export const selectModalPokemon = (state: { team: TeamState }) =>
    state.team.modalPokemon;

export default teamSlice.reducer;
