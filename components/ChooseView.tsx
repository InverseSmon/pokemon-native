import React from "react";
import { StyleSheet, View } from "react-native";

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setView } from "@/state/viewSlice";
import { GenButton } from "./StyledButton";

export default function ChooseView() {
    const dispatch = useAppDispatch();
    const currentView = useAppSelector((state) => state.view.view);

    return (
        <View style={styles.views}>
            <GenButton
                onPress={() => dispatch(setView("stats"))}
                title="Stats"
                underline={currentView === "stats"}
            />
            <GenButton
                onPress={() => dispatch(setView("moves"))}
                title="Moves"
                underline={currentView === "moves"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    views: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
});
