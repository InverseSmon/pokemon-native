import React, { useEffect } from "react";
import { RootState } from "@/state/store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { StyleSheet, TextInput, Button, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { addPokemon } from "@/state/pokemonSlice";
import {
    setSearchByName,
    setValue,
    setNumber,
    setText,
} from "@/state/searchPokemonSlice";
import { setView } from "@/state/viewSlice";
import { NameNumberButton, GenButton } from "./StyledButton";

const NameNumberTabs = () => {
    const searchByName = useAppSelector((state) => state.search.searchByName);
    const dispatch = useAppDispatch();

    return (
        <View style={styles.nameNumberButtons}>
            <NameNumberButton
                title="By Name"
                onPress={() => {
                    dispatch(setSearchByName(true));
                    dispatch(setNumber(""));
                }}
                highlight={searchByName}
            />
            <NameNumberButton
                title="By Number"
                onPress={() => {
                    dispatch(setSearchByName(false));
                    dispatch(setText(""));
                }}
                highlight={!searchByName}
            />
        </View>
    );
};

const FindByName = () => {
    const text = useAppSelector((state) => state.search.text);
    const dispatch = useAppDispatch();

    return (
        <View style={styles.input}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => dispatch(setText(text))}
                value={text}
                onSubmitEditing={() => {
                    dispatch(setValue(text.toLowerCase()));
                    dispatch(setView("stats"));
                }}
            />
            <Button
                title="Find"
                onPress={() => {
                    dispatch(setValue(text.toLowerCase()));
                    dispatch(setView("stats"));
                }}
            />
        </View>
    );
};

const FindByNumber = () => {
    const number = useAppSelector((state) => state.search.number);
    const dispatch = useAppDispatch();

    const handleNumberChange = (text: string) => {
        const cleanedValue = text.replace(/[^0-9]/g, "");

        const parsedValue = parseInt(cleanedValue, 10);
        if (parsedValue > 0 && parsedValue < 1026) {
            dispatch(setNumber(parsedValue.toString()));
        } else {
            dispatch(setNumber(""));
        }
    };

    return (
        <View style={styles.input}>
            <TextInput
                keyboardType="numeric"
                style={styles.textInput}
                onChangeText={handleNumberChange}
                value={number}
                onSubmitEditing={() => {
                    dispatch(setValue(number));
                    dispatch(setView("stats"));
                }}
            />
            <Button
                title="Find"
                onPress={() => {
                    dispatch(setValue(number));
                    dispatch(setView("stats"));
                }}
            />
        </View>
    );
};

export default function FindPokemon() {
    const searchByName = useAppSelector((state) => state.search.searchByName);
    const value = useAppSelector((state) => state.search.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!value) return;

        const url = "https://pokeapi.co/api/v2/pokemon/" + value;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(addPokemon(json));
            })
            .catch((error) => console.error(error));
    }, [value, dispatch]);

    return (
        <>
            <ThemedText style={styles.themedText}>Find Pokemon</ThemedText>

            <View style={styles.submitView}>
                <View>
                    <NameNumberTabs />
                    {searchByName ? <FindByName /> : <FindByNumber />}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    picker: {
        gap: 8,
    },
    pickerButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    submitView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: 250,
        borderColor: "gray",
        borderWidth: 1,
        marginRight: 5,
    },
    input: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    nameNumberButtons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        // marginTop: 5,
    },
    themedText: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        borderBottomWidth: 1,
    },
});
