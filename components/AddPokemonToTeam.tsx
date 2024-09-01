import React from "react";
import { Text, View, Linking, Button, StyleSheet } from "react-native";
import { AddPokemonToTeamButton } from "./StyledButton";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { RootState } from "@/state/store";
import { addPlayer } from "@/state/teamSlice";
import { useNavigation } from "@react-navigation/native";

function AddPokemonToTeam() {
    const navigation = useNavigation();
    const team = useAppSelector((state: RootState) => state.team.team);
    const pokemon = useAppSelector((state: RootState) => state.pokemon.pokemon);
    const dispatch = useAppDispatch();

    const onPress = () => {
        try {
            if (team.length >= 6) {
                throw new Error("Team is full!");
            } else {
                if (pokemon) {
                    dispatch(addPlayer(pokemon.name));
                    console.log("Added " + pokemon.name + " to team");
                    navigation.navigate("team" as never);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return <AddPokemonToTeamButton onPress={onPress} />;
}

export default AddPokemonToTeam;
