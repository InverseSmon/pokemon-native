import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setModalView } from "@/state/teamSlice";
import { GetPokemonPicture } from "./GetPictures";
import { PokemonNameTypes } from "./PokemonInfo";
import { splitAndCapitalize } from "./PokemonInfo";

interface MemberModalProps {
    name: string;
}

export const MemberModal = ({ name }: MemberModalProps) => {
    const dispatch = useAppDispatch();
    const modalVisible = useAppSelector((state) => state.team.modalView);
    const pokemon = useAppSelector((state) => state.pokemon.pokemon);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                dispatch(setModalView(false));
            }}
        >
            <View style={styles.container}>
                <GetPokemonPicture name={name} pictureSize={220} />
                {pokemon ? <PokemonNameTypes data={pokemon} /> : null}
                {pokemon?.abilities.map((ability) => (
                    <Text key={ability.ability.name}>
                        {splitAndCapitalize(ability.ability.name)}
                    </Text>
                ))}
                <Button
                    title="Close"
                    onPress={() => {
                        dispatch(setModalView(false));
                    }}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 60,
    },
    nameTitle: {
        fontSize: 35,
        margin: 20,
    },
});
