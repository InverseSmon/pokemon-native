import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setModalView } from "@/state/teamSlice";
import { GetPokemonPicture } from "./GetPictures";
import { PokemonNameTypes } from "./PokemonInfo";
import { splitAndCapitalize } from "./PokemonInfo";
import { GetAbilities } from "./GetAbilities";
import { PokemonData } from "@/state/pokemonSlice";
import Moves from "@/components/MovesView";

interface MemberModalProps {
    pokemon: PokemonData;
}

export const MemberModal = ({ pokemon }: MemberModalProps) => {
    const dispatch = useAppDispatch();
    const modalVisible = useAppSelector((state) => state.team.modalView);

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
                <GetPokemonPicture pokemon={pokemon} pictureSize={220} />
                {pokemon ? <PokemonNameTypes data={pokemon} /> : null}
                <GetAbilities pokemon={pokemon} />
                {/* <Moves data={pokemon.moves} id={pokemon.id} /> */}
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
        padding: 10,
    },
    nameTitle: {
        fontSize: 35,
        margin: 20,
    },
});
