import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import PokemonTypes from "@/components/PokemonTypes";
import PokemonStats from "@/components/PokemonStats";
import { PreviousNextButton } from "@/components/StyledButton";
import { PokemonData, addPokemon } from "@/state/pokemonSlice";
import { setView } from "@/state/viewSlice";

import { useAppDispatch } from "@/state/hooks";
import { useState, useEffect } from "react";

function heightToMeters(height: number) {
    return height / 10;
}

function weightToKilograms(weight: number) {
    return weight / 10;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function splitAndCapitalize(string: string) {
    return string
        .split("-")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ");
}

function PokemonNameTypes({ data }: { data: PokemonData }) {
    return (
        <View style={styles.nameTypes}>
            <ThemedText type="subtitle" style={styles.name}>
                {data?.species
                    ? splitAndCapitalize(data?.species.name)
                    : "Not found"}{" "}
                {"#" + data?.id}
            </ThemedText>
            <PokemonTypes data={data} />
        </View>
    );
}

export function NameTypesWithControls({ data }: { data: PokemonData }) {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number>(0);

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
    }, [value]);

    const onPress = (num: number) => {
        const newId = data.id + num;

        newId < 1 || newId > 1025
            ? console.log("Invalid number")
            : setValue(newId);
        dispatch(setView("stats"));
    };

    return (
        <View style={styles.namePlusControls}>
            <PreviousNextButton onPress={() => onPress(-1)} previous={true} />
            <PokemonNameTypes data={data} />
            <PreviousNextButton onPress={() => onPress(1)} previous={false} />
        </View>
    );
}

export function PokemonHeightWeight({ data }: { data: any }) {
    return (
        <View style={styles.heightWeight}>
            <ThemedText type="defaultSemiBold">
                {"Height: " + String(heightToMeters(data?.height))}
                {"m"}
            </ThemedText>
            <ThemedText type="defaultSemiBold">
                {" Weight: " + String(weightToKilograms(data?.weight))}
                {"kg"}
            </ThemedText>
        </View>
    );
}

export default function PokemonInfo({ data }: { data: any }) {
    return (
        <>
            <PokemonHeightWeight data={data} />
            <PokemonStats name={data?.name} />
        </>
    );
}

const styles = StyleSheet.create({
    heightWeight: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        textAlign: "center",
        marginBottom: 20,
    },
    name: {
        fontSize: 30,
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
    },
    nameTypes: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        height: 40,
    },
    namePlusControls: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});
