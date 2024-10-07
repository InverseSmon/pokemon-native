import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { splitAndCapitalize } from "./PokemonInfo";
import { View, StyleSheet, Text } from "react-native";
import { PokemonMove } from "@/components/MovesView";

type abilities = {
    ability: {
        name: string;
    };
    is_hidden: boolean;
}[];

export const AbilitiesDropdown: React.FC<{ abilities: abilities }> = ({
    abilities,
}) => {
    const abilitiesList = abilities.map((ability) => {
        return ability.is_hidden
            ? {
                  label: splitAndCapitalize(ability.ability.name) + " (Hidden)",
                  value: ability.ability.name,
              }
            : {
                  label: splitAndCapitalize(ability.ability.name),
                  value: ability.ability.name,
              };
    });

    const [value, setValue] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Ability:</Text>
            <Dropdown
                style={styles.dropdown}
                value={value}
                data={abilitiesList}
                labelField="label"
                valueField="value"
                onChange={(item) => setValue(item.value)}
            />
        </View>
    );
};

export const GenerationDropdown: React.FC<{}> = () => {
    const generations = [
        { value: "All" },
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
    ];

    const [value, setValue] = useState("All");

    return (
        <View style={styles.generationContainer}>
            <Text style={styles.subtitle}>Generation:</Text>
            <Dropdown
                style={styles.generationDropdown}
                value={value}
                data={generations}
                labelField="value"
                valueField="value"
                onChange={(item) => setValue(item.value)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        width: 200,
        height: 40,
        margin: 10,
        padding: 5,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#BFBFBF",
    },
    generationDropdown: {
        width: 60,
        height: 40,
        margin: 10,
        padding: 5,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#BFBFBF",
    },
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        margin: 5,
    },
    generationContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
        alignContent: "center",
        paddingLeft: 14,
        margin: 5,
        marginBottom: 0,
    },
    subtitle: {
        fontSize: 20,
        textAlign: "left",
        alignSelf: "center",
    },
});
