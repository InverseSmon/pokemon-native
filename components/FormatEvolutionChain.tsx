import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EvolutionChain } from "@/state/evolutionSlice";
import { GetPokemonPicture } from "./GetPictures";
import { capitalizeFirstLetter } from "./PokemonInfo";

type Evolution = {
    species: {
        name: string;
    };
    evolution_details: {
        trigger: {
            name: string;
        };
    }[];
    evolves_to?: Evolution[];
};

export const FormatEvolutionChain: React.FC<{
    evolutionChain: EvolutionChain;
}> = ({ evolutionChain }) => {
    const renderEvolution = (evolution: Evolution): JSX.Element => {
        return (
            <View style={styles.evolutionChain}>
                {evolution.species ? (
                    <View style={styles.pokemon}>
                        {evolution.evolution_details[0] &&
                        evolution.evolution_details[0].trigger ? (
                            <Text style={styles.name}>
                                {evolution.evolution_details[0].trigger.name}
                            </Text>
                        ) : null}
                        <GetPokemonPicture
                            name={evolution.species.name}
                            pictureSize={100}
                        />
                        <Text style={styles.name}>
                            {capitalizeFirstLetter(evolution.species.name)}
                        </Text>
                    </View>
                ) : null}
                {evolution.evolves_to && evolution.evolves_to.length > 0 && (
                    <View style={styles.evolution}>
                        {evolution.evolves_to.map((nextEvolution: Evolution) =>
                            renderEvolution(nextEvolution)
                        )}
                    </View>
                )}
            </View>
        );
    };

    return <>{evolutionChain ? renderEvolution(evolutionChain.chain) : null}</>;
};

const styles = StyleSheet.create({
    evolutionChain: {
        flexDirection: "column",
        justifyContent: "center",
    },
    evolution: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    pokemon: {
        alignSelf: "center",
        // textAlign: "center",
        justifyContent: "center",
    },
    name: {
        textAlign: "center",
        fontSize: 16,
    },
});
