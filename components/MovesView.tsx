import React, { useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { GenerationDropdown } from "@/components/GenerationButtons";
import { VersionButtons } from "@/components/VersionButtons";
import VersionMoves, { populateMovesLists } from "@/components/MovesSort";

export type PokemonMove = {
    move: {
        name: string;
    };
    version_group_details: {
        level_learned_at: number;
        move_learn_method: {
            name: string;
        };
        version_group: {
            name: string;
        };
    }[];
};

interface MovesProps {
    data: PokemonMove[];
}

const MovesView: React.FC<MovesProps> = ({ data }) => {
    const versionMap = populateMovesLists(data);

    return (
        <ThemedView>
            <GenerationDropdown />
            <VersionMoves versionMap={versionMap} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    buttonList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: 8,
    },
    versionList: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 0,
        marginBottom: 0,
    },
    movesList: {
        overflow: "scroll",
        height: 1000,
    },
});

export default MovesView;
