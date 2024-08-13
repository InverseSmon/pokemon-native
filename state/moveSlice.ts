import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MoveData = {
    name: string;
    power: number;
    accuracy: number;
    pp: number;
    type: {
        name: string;
    };
};

interface MovesViewState {
    generation: number;
    version: string;
    move: MoveData | null;
    learnMethod: string;
}

const initialState: MovesViewState = {
    generation: 1,
    version: "red-blue",
    move: null,
    learnMethod: "level-up",
};

export const moveSlice = createSlice({
    name: "movesView",
    initialState,
    reducers: {
        setGeneration: (state, action: PayloadAction<number>) => {
            state.generation = action.payload;
        },
        setVersion: (state, action: PayloadAction<string>) => {
            state.version = action.payload;
        },
        setMove: (state, action: PayloadAction<MoveData>) => {
            state.move = action.payload;
        },
        setLearnMethod: (state, action: PayloadAction<string>) => {
            state.learnMethod = action.payload;
        },
    },
});

export const { setGeneration, setVersion, setMove, setLearnMethod } =
    moveSlice.actions;

export const selectGeneration = (state: { movesView: MovesViewState }) =>
    state.movesView.generation;
export const selectVersion = (state: { movesView: MovesViewState }) =>
    state.movesView.version;
export const selectMove = (state: { movesView: MovesViewState }) =>
    state.movesView.move;
export const selectLearnMethod = (state: { movesView: MovesViewState }) =>
    state.movesView.learnMethod;

export default moveSlice.reducer;
