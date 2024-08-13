import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewState {
    view: string;
}

const initialState: ViewState = {
    view: "stats",
};

export const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<string>) => {
            state.view = action.payload;
        },
    },
});

export const { setView } = viewSlice.actions;

export const selectView = (state: { view: ViewState }) => state.view.view;

export default viewSlice.reducer;
