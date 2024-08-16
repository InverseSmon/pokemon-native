import React, { useMemo, useState } from "react";
import { RootState } from "@/state/store";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { View, Text } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { GenButton } from "./StyledButton";
import { setLearnMethod } from "@/state/moveSlice";

import Move from "@/components/Move";

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

interface MoveDetail {
    name: string;
    method: string;
    level: number;
}

interface MoveList {
    "level-up": MoveDetail[];
    machine: MoveDetail[];
    egg: MoveDetail[];
    [key: string]: MoveDetail[];
}

interface VersionMap {
    [key: string]: MoveList;
}

export function populateMovesLists(data: PokemonMove[]) {
    const versionMap: VersionMap = {
        "red-blue": { "level-up": [], machine: [], egg: [] },
        yellow: { "level-up": [], machine: [], egg: [] },
        "gold-silver": { "level-up": [], machine: [], egg: [] },
        crystal: { "level-up": [], machine: [], egg: [] },
        "ruby-sapphire": { "level-up": [], machine: [], egg: [] },
        emerald: { "level-up": [], machine: [], egg: [] },
        "firered-leafgreen": { "level-up": [], machine: [], egg: [] },
        "diamond-pearl": { "level-up": [], machine: [], egg: [] },
        platinum: { "level-up": [], machine: [], egg: [] },
        "heartgold-soulsilver": { "level-up": [], machine: [], egg: [] },
        "black-white": { "level-up": [], machine: [], egg: [] },
        "black-2-white-2": { "level-up": [], machine: [], egg: [] },
        "x-y": { "level-up": [], machine: [], egg: [] },
        "omega-ruby-alpha-sapphire": { "level-up": [], machine: [], egg: [] },
        "sun-moon": { "level-up": [], machine: [], egg: [] },
        "ultra-sun-ultra-moon": { "level-up": [], machine: [], egg: [] },
        "sword-shield": { "level-up": [], machine: [], egg: [] },
    };

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].version_group_details.length; j++) {
            const versionName =
                data[i].version_group_details[j]?.version_group.name;
            const moveLearnMethod =
                data[i].version_group_details[j]?.move_learn_method.name;
            const levelLearnedAt =
                data[i].version_group_details[j]?.level_learned_at;
            if (
                versionName in versionMap &&
                ["level-up", "machine", "egg"].includes(moveLearnMethod)
            ) {
                versionMap[versionName][moveLearnMethod].push({
                    name: data[i].move.name,
                    method: moveLearnMethod,
                    level: levelLearnedAt,
                });
            }
        }
    }

    return versionMap;
}

interface VersionMovesProps {
    versionMap: VersionMap;
}

const VersionMoves: React.FC<VersionMovesProps> = ({ versionMap }) => {
    const version = useAppSelector(
        (state: RootState) => state.movesView.version
    );
    const dispatch = useAppDispatch();
    const learnStyle = useAppSelector(
        (state: RootState) => state.movesView.learnMethod
    );

    if (version in versionMap) {
        const moveList = versionMap[version];
        moveList["level-up"].sort((a, b) => a.level - b.level);

        return (
            <View>
                <View style={styles.learnsetTitles}>
                    <GenButton
                        onPress={() => dispatch(setLearnMethod("level-up"))}
                        title="Level-up"
                        underline={learnStyle === "level-up"}
                    />
                    <GenButton
                        onPress={() => dispatch(setLearnMethod("machine"))}
                        title="TM/HM"
                        underline={learnStyle === "machine"}
                    />
                    <GenButton
                        onPress={() => dispatch(setLearnMethod("egg"))}
                        title="Egg"
                        underline={learnStyle === "egg"}
                    />
                </View>
                {/* <ScrollView style={styles.movesView}> */}
                <View style={styles.movesView}>
                    {learnStyle === "level-up"
                        ? moveList["level-up"].map((move, index) => (
                              //   <View style={styles.levelView}>
                              <View style={styles.levelUp}>
                                  <Text style={styles.level}>
                                      L{move.level}
                                  </Text>
                                  <Move key={index} moveRawData={move.name} />
                              </View>
                              //  </View>
                          ))
                        : learnStyle === "machine"
                        ? moveList.machine.map((move, index) => (
                              <Move key={index} moveRawData={move.name} />
                          ))
                        : moveList.egg.map((move, index) => (
                              <Move key={index} moveRawData={move.name} />
                          ))}
                </View>
            </View>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    learnsetTitles: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: 5,
    },
    level: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 25,
        width: "15%",
    },
    levelUp: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        // margin: 5,
    },
    movesView: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default VersionMoves;
