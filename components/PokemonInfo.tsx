import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import PokemonTypes from "@/components/PokemonTypes";
import PokemonStats from "@/components/PokemonStats";

function heightToMeters(height: number) {
    return height / 10;
}

function weightToKilograms(weight: number) {
    return weight / 10;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function splitAndCapitalize(string: string) {
    return string
        .split("-")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ");
}

export function PokemonNameTypes({ data }: { data: any }) {
    return (
        <View style={styles.nameTypes}>
            <ThemedText type="subtitle" style={styles.name}>
                {data?.species
                    ? capitalizeFirstLetter(data?.species.name)
                    : "Not found"}{" "}
                {"#" + data?.id}
            </ThemedText>
            <PokemonTypes data={data} />
        </View>
    );
}

export function PokemonHeightWeight({ data }: { data: any }) {
    return (
        <View style={styles.heightWeight}>
            <ThemedText type="defaultSemiBold">
                {"Height: " + String(heightToMeters(data?.height))}
                {"m"}
            </ThemedText>
            <ThemedText type="defaultSemiBold">
                {" Weight: " + String(weightToKilograms(data?.weight))}
                {"kg"}
            </ThemedText>
        </View>
    );
}

export default function PokemonInfo({ data }: { data: any }) {
    return (
        <>
            <PokemonHeightWeight data={data} />
            <PokemonStats name={data?.name} />
        </>
    );
}

const styles = StyleSheet.create({
    heightWeight: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        textAlign: "center",
        marginBottom: 20,
    },
    name: {
        fontSize: 30,
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
    },
    nameTypes: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
});
