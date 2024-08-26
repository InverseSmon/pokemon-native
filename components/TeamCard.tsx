import React from "react";
import { Text, View, Linking, Button, StyleSheet } from "react-native";
import { TeamButton, RemovePokemonFromTeamButton } from "./StyledButton";
import { GetPokemonPicture } from "./GetPictures";
import { splitAndCapitalize } from "./PokemonInfo";
import { useAppDispatch } from "@/state/hooks";
import { removePlayer } from "@/state/teamSlice";

interface TeamMemberCardProps {
    pokemon: string;
    teamPosition: number;
}

export const TeamMemberCard = ({
    pokemon,
    teamPosition,
}: TeamMemberCardProps) => {
    const dispatch = useAppDispatch();
    const onPress = () => {
        console.log("Removed " + pokemon + " from team");
        dispatch(removePlayer(teamPosition));
    };

    return (
        <View style={styles.card}>
            <GetPokemonPicture name={pokemon} pictureSize={120} />
            <Text>{splitAndCapitalize(pokemon)}</Text>
            <View style={styles.remove}>
                <RemovePokemonFromTeamButton onPress={onPress} />
            </View>
        </View>
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
