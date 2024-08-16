import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamState {
    team: string[];
}

const initialState: TeamState = {
    team: [],
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        addPlayer: (state, action: PayloadAction<string>) => {
            state.team.push(action.payload);
        },
        removePlayer: (state, action: PayloadAction<string>) => {
            state.team = state.team.filter(
                (player) => player !== action.payload
            );
        },
    },
});

export const { addPlayer, removePlayer } = teamSlice.actions;

export const selectTeam = (state: { team: TeamState }) => state.team.team;

export default teamSlice.reducer;
