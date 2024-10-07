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
import { AbilitiesDropdown, GenerationDropdown } from "./ModalDropdowns";
import { ModalMoves } from "./ModalMoves";

interface MemberModalProps {
    pokemon: PokemonData;
}

const dummyMoves = {
    move1: "move1",
    move2: "move2",
    move3: "move3",
    move4: "move4",
};

export const MemberModal = ({ pokemon }: MemberModalProps) => {
    const dispatch = useAppDispatch();
    const modalVisible = useAppSelector((state) => state.team.modalView);
    const dataList = useAppSelector((state) => state.team.teamMemberDataList);

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
                <GenerationDropdown />
                <AbilitiesDropdown abilities={pokemon.abilities} />
                <ModalMoves
                    moveset={dataList ? dataList[0].moves : dummyMoves}
                />
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
