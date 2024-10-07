import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type moveset = {
    move1: string;
    move2: string;
    move3: string;
    move4: string;
};

type ChooseMoveProps = {
    move: string;
};

const ChooseMove: React.FC<ChooseMoveProps> = ({ move }) => {
    const [selectedMove, setSelectedMove] = useState<string>(move);
    const onPress = () => {
        console.log("You chose " + move);
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{move}</Text>
        </TouchableOpacity>
    );
};

type ModalMovesProps = {
    moveset: moveset;
};

export const ModalMoves: React.FC<ModalMovesProps> = ({ moveset }) => {
    return (
        <View>
            {moveset.move1 ? <ChooseMove move={moveset.move1} /> : null}
            <ChooseMove move={moveset.move2} />
            <ChooseMove move={moveset.move3} />
            <ChooseMove move={moveset.move4} />
        </View>
    );
};
