import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { TeamButton, RemovePokemonFromTeamButton } from "./StyledButton";
import { GetPokemonPicture } from "./GetPictures";
import { splitAndCapitalize } from "./PokemonInfo";
import { useAppDispatch } from "@/state/hooks";
import {
    removePlayer,
    removeTeamMemberData,
    setModalView,
    setModalPokemon,
} from "@/state/teamSlice";
import { addPokemon, PokemonData } from "@/state/pokemonSlice";

interface TeamMemberCardProps {
    pokemon: PokemonData;
    teamPosition: number;
}

export const TeamMemberCard = ({
    pokemon,
    teamPosition,
}: TeamMemberCardProps) => {
    const dispatch = useAppDispatch();
    const onPress = () => {
        console.log("Removed " + pokemon.name + " from team");
        dispatch(removePlayer(teamPosition));
        dispatch(removeTeamMemberData(teamPosition));
    };

    const [pressed, setPressed] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

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
                setPressed(false);
            })
            .catch((error) => console.error(error));
    }, [value, dispatch, pressed]);

    const onPressView = () => {
        dispatch(setModalView(true));
        dispatch(setModalPokemon(pokemon));
        setPressed(true);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPressView}>
            <GetPokemonPicture
                pokemon={pokemon}
                pictureSize={120}
                specifiedOnPress={onPressView}
            />
            <Text>{splitAndCapitalize(pokemon.name)}</Text>
            <View style={styles.remove}>
                <RemovePokemonFromTeamButton onPress={onPress} />
            </View>
        </TouchableOpacity>
    );
};

export const EmptySlot = () => {
    return <View style={styles.emptyCard}></View>;
};

export const AddPokemonButton = () => {
    return (
        <View style={styles.addPokemonCard}>
            <TeamButton title={"+"} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        width: 160,
        height: 160,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "green",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addPokemonCard: {
        backgroundColor: "#fff",
        width: 160,
        height: 160,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "blue",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    emptyCard: {
        backgroundColor: "#fff",
        width: 160,
        height: 160,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        margin: 10,
    },
    cardText: {
        fontSize: 20,
    },
    remove: {
        position: "absolute",
        top: -10,
        right: -10,
    },
});
