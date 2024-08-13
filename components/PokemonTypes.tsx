import React from "react";
import { Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { FindTypeImage } from "@/components/FindTypeImage";
import { capitalizeFirstLetter } from "@/components/PokemonInfo";

export default function PokemonTypes({ data }: { data: any }) {
    return (
        <ThemedText type="subtitle" style={styles.types}>
            {/* Type: {""} */}
            {data && data?.types && data?.types[0] && data?.types[1] ? (
                <>
                    <Image
                        style={styles.typeImage}
                        source={FindTypeImage(data?.types[0].type.name)}
                    />{" "}
                    {capitalizeFirstLetter(data?.types[0].type.name)}
                    {"  "}
                    <Image
                        style={styles.typeImage}
                        source={FindTypeImage(data?.types[1].type.name)}
                    />{" "}
                    {capitalizeFirstLetter(data?.types[1].type.name)}{" "}
                </>
            ) : data && data?.types && data?.types[0] ? (
                <>
                    <Image
                        style={styles.typeImage}
                        source={FindTypeImage(data?.types[0].type.name)}
                    />{" "}
                    {capitalizeFirstLetter(data?.types[0].type.name)}{" "}
                </>
            ) : (
                ""
            )}
        </ThemedText>
    );
}

const styles = StyleSheet.create({
    types: {
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "center",
    },
    typeImage: {
        width: 20,
        height: 20,
    },
});
