import React from "react";
import { Text, View, Linking, Button, StyleSheet } from "react-native";
import { TeamButton } from "./StyledButton";
import { GetPokemonPicture } from "./GetPictures";

interface TeamMemberCardProps {
    pokemon: string;
}

export const TeamMemberCard = ({ pokemon }: TeamMemberCardProps) => {
    return (
        <View style={styles.card}>
            <GetPokemonPicture name={pokemon} pictureSize={100} />
            <Text>{pokemon}</Text>
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
        width: "40%",
        height: "23%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "green",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addPokemonCard: {
        backgroundColor: "#fff",
        width: "40%",
        height: "23%",
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
        width: "40%",
        height: "23%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "grey",
        margin: 10,
    },
    cardText: {
        fontSize: 20,
    },
});
