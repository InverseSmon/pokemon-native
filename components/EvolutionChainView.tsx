import React, { useMemo, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { ThemedView } from "@/components/ThemedView";
import { GenerationDropdown } from "@/components/GenerationButtons";
import { VersionButtons } from "@/components/VersionButtons";
import VersionMoves, { populateMovesLists } from "@/components/MovesSort";
import { setSpecies } from "@/state/evolutionSlice";

function EvolutionChainView(data: string) {
    const dispatch = useAppDispatch();
    const species = useAppSelector((state) => state.evolution.species);

    useEffect(() => {
        if (!species) return;

        const url = "https://pokeapi.co/api/v2/pokemon-species/" + data;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(setSpecies(json));
            })
            .catch((error) => console.error(error));
    }, [species, dispatch]);

    return <ThemedView></ThemedView>;
}
