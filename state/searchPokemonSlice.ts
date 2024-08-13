import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    searchByName: boolean;
    text: string;
    number: string;
    value: string;
}

const initialState: SearchState = {
    searchByName: true,
    text: "",
    number: "",
    value: "",
};

export const searchPokemonSlice = createSlice({
    name: "searchPokemon",
    initialState,
    reducers: {
        setSearchByName: (state, action: PayloadAction<boolean>) => {
            state.searchByName = action.payload;
        },
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setNumber: (state, action: PayloadAction<string>) => {
            state.number = action.payload;
        },
        setValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setSearchByName, setText, setNumber, setValue } =
    searchPokemonSlice.actions;

export const selectSearchByName = (state: {
    search: { searchByName: boolean };
}) => state.search.searchByName;

export const selectText = (state: { search: { text: string } }) =>
    state.search.text;
export const selectNumber = (state: { search: { number: string } }) =>
    state.search.number;
export const selectValue = (state: { search: { value: string } }) =>
    state.search.value;

export default searchPokemonSlice.reducer;
