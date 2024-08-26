import React, { useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { GenerationDropdown } from "@/components/GenerationButtons";
import VersionMoves, { populateMovesLists } from "@/components/MovesSort";
import { useAppDispatch } from "@/state/hooks";
import { setGeneration, setVersion, setLearnMethod } from "@/state/moveSlice";
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

const chooseGeneration = (id: number) => {
    const dispatch = useAppDispatch();
    if (id < 152) {
        dispatch(setGeneration(1));
        dispatch(setVersion("red-blue"));
    } else if (id < 252) {
        dispatch(setGeneration(2));
        dispatch(setVersion("gold-silver"));
    } else if (id < 387) {
        dispatch(setGeneration(3));
        dispatch(setVersion("ruby-sapphire"));
    } else if (id < 494) {
        dispatch(setGeneration(4));
        dispatch(setVersion("diamond-pearl"));
    } else if (id < 650) {
        dispatch(setGeneration(5));
        dispatch(setVersion("black-white"));
    } else if (id < 722) {
        dispatch(setGeneration(6));
        dispatch(setVersion("x-y"));
    } else {
        dispatch(setGeneration(7));
        dispatch(setVersion("sun-moon"));
    }
    dispatch(setLearnMethod("level-up"));
};

interface MovesProps {
    data: PokemonMove[];
    id: number;
}

const MovesView: React.FC<MovesProps> = ({ data, id }) => {
    chooseGeneration(id);
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
