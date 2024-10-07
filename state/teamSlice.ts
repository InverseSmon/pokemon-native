import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonData } from "./pokemonSlice";

export type teamMemberData = {
    ability: string;
    moves: { move1: string; move2: string; move3: string; move4: string };
};

interface TeamState {
    team: PokemonData[];
    modalPokemon: PokemonData | null;
    modalView: boolean;
    teamMemberDataList: teamMemberData[];
}

const initialState: TeamState = {
    team: [],
    modalPokemon: null,
    modalView: false,
    teamMemberDataList: [],
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
        addTeamMemberData: (state, action: PayloadAction<teamMemberData>) => {
            state.teamMemberDataList.push(action.payload);
        },
        removeTeamMemberData: (state, action: PayloadAction<number>) => {
            state.teamMemberDataList.splice(action.payload, 1);
        },
    },
});

export const {
    addPlayer,
    removePlayer,
    setModalView,
    setModalPokemon,
    addTeamMemberData,
    removeTeamMemberData,
} = teamSlice.actions;

export const selectTeam = (state: { team: TeamState }) => state.team.team;

export const selectModalView = (state: { team: TeamState }) =>
    state.team.modalView;

export const selectModalPokemon = (state: { team: TeamState }) =>
    state.team.modalPokemon;

export const selectMovesetList = (state: { team: TeamState }) =>
    state.team.teamMemberDataList;

export default teamSlice.reducer;
