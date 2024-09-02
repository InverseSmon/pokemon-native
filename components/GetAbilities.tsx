import { PokemonData } from "@/state/pokemonSlice";
import { View, Text, StyleSheet } from "react-native";
import { splitAndCapitalize } from "./PokemonInfo";
import { ThemedText } from "./ThemedText";

interface GetAbilitiesProps {
    pokemon: PokemonData | null;
}

export const GetAbilities = ({ pokemon }: GetAbilitiesProps) => {
    return (
        <View style={styles.container}>
            <ThemedText type={"defaultSemiBold"}>Abilities:</ThemedText>
            <View style={styles.cardsContainer}>
                {pokemon?.abilities.map((ability) =>
                    ability.is_hidden ? (
                        <View style={styles.hiddenAbilityCard}>
                            <Text
                                style={styles.ability}
                                key={ability.ability.name}
                            >
                                {splitAndCapitalize(ability.ability.name)}
                            </Text>
                            <Text style={styles.hiddenTag}>Hidden</Text>
                        </View>
                    ) : (
                        <View style={styles.abilityCard}>
                            <Text
                                style={styles.ability}
                                key={ability.ability.name}
                            >
                                {splitAndCapitalize(ability.ability.name)}
                            </Text>
                        </View>
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        flexWrap: "wrap",
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    subtitle: {
        fontSize: 20,
        marginLeft: 15,
        width: "100%",
        textAlign: "left",
    },
    ability: {
        fontSize: 15,
        margin: 5,
        color: "white",
    },
    hiddenTag: {
        fontSize: 8,
        color: "white",
        position: "absolute",
        bottom: 2,
        right: 2,
    },
    abilityCard: {
        backgroundColor: "#38AECC",
        margin: 3,
        borderRadius: 5,
        width: 130,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    hiddenAbilityCard: {
        backgroundColor: "#903EB6",
        margin: 3,
        borderRadius: 5,
        width: 130,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },
});
