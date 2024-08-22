import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EvolutionChain } from "@/state/evolutionSlice";
import { GetPokemonPicture } from "./GetPictures";
import { capitalizeFirstLetter, splitAndCapitalize } from "./PokemonInfo";

type Evolution = {
    species: {
        name: string;
    };
    evolution_details: {
        trigger: {
            name: string;
        };
        gender?: number;
        held_item?: {
            name: string;
        };
        item?: {
            name: string;
        };
        known_move?: {
            name: string;
        };
        known_move_type?: {
            name: string;
        };
        location?: {
            name: string;
        };
        min_affection?: number;
        min_beauty?: number;
        min_happiness?: number;
        min_level?: number;
        needs_overworld_rain?: boolean;
        party_species?: {
            name: string;
        };
        party_type?: {
            name: string;
        };
        relative_physical_stats?: number;
        time_of_day?: string;
        trade_species?: {
            name: string;
        };
        turn_upside_down?: boolean;
    }[];
    evolves_to?: Evolution[];
};

const EvolutionDetails: React.FC<{ evolution: Evolution }> = ({
    evolution,
}) => {
    const evolutionMethodList: string[] = [];
    let evolutionTrigger = "";

    evolution.evolution_details[0].trigger.name === "level-up"
        ? (evolutionTrigger = "Level Up -")
        : evolution.evolution_details[0].trigger.name === "use-item"
        ? (evolutionTrigger = "Use Item -")
        : evolution.evolution_details[0].trigger.name === "trade"
        ? (evolutionTrigger = "Trade -")
        : (evolutionTrigger = "Special Condition -");

    evolution.evolution_details.forEach((detail) => {
        console.log(detail);
        if (detail.min_level) {
            evolutionMethodList.push(`${detail.min_level}`);
        }
        if (detail.gender) {
            detail.gender === 1
                ? evolutionMethodList.push(`Female`)
                : detail.gender === 2
                ? evolutionMethodList.push(`Male`)
                : null;
        }
        if (detail.held_item) {
            evolutionMethodList.push(
                `Hold: ${splitAndCapitalize(detail.held_item.name)}`
            );
        }
        if (detail.item) {
            evolutionMethodList.push(`${splitAndCapitalize(detail.item.name)}`);
        }
        if (detail.known_move) {
            evolutionMethodList.push(
                `Known Move: ${splitAndCapitalize(detail.known_move.name)}`
            );
        }
        if (detail.known_move_type) {
            evolutionMethodList.push(
                `Move Type: ${capitalizeFirstLetter(
                    detail.known_move_type.name
                )}`
            );
        }
        if (detail.location) {
            evolutionMethodList.push(
                `${splitAndCapitalize(detail.location.name)}`
            );
        }
        if (detail.min_affection) {
            evolutionMethodList.push(`Affection: ${detail.min_affection}`);
        }
        if (detail.min_beauty) {
            evolutionMethodList.push(`Beauty: ${detail.min_beauty}`);
        }
        if (detail.min_happiness) {
            evolutionMethodList.push(`Happiness: ${detail.min_happiness}`);
        }
        if (detail.needs_overworld_rain) {
            evolutionMethodList.push(`Rain`);
        }
        if (detail.party_species) {
            evolutionMethodList.push(
                `Party Species: ${splitAndCapitalize(
                    detail.party_species.name
                )}`
            );
        }
        if (detail.party_type) {
            evolutionMethodList.push(
                `Party Type: ${capitalizeFirstLetter(detail.party_type.name)}`
            );
        }
        if (detail.relative_physical_stats) {
            detail.relative_physical_stats === 1
                ? evolutionMethodList.push(`Attack > Defense`)
                : detail.relative_physical_stats === -1
                ? evolutionMethodList.push(`Defense > Attack`)
                : detail.relative_physical_stats === 0
                ? evolutionMethodList.push(`Attack = Defense`)
                : null;
        }
        if (detail.time_of_day) {
            evolutionMethodList.push(
                `Time: ${splitAndCapitalize(detail.time_of_day)}`
            );
        }
        if (detail.trade_species) {
            evolutionMethodList.push(
                `Trade Species: ${capitalizeFirstLetter(
                    detail.trade_species.name
                )}`
            );
        }
        if (detail.turn_upside_down) {
            evolutionMethodList.push(`Upside Down`);
        }
    }, "");

    return (
        <>
            <Text style={styles.method}>
                {splitAndCapitalize(
                    evolution.evolution_details[0].trigger.name
                )}
            </Text>
            {evolutionMethodList.map((method) => (
                <Text style={styles.method}>{method}</Text>
            ))}
        </>
    );
};

export const FormatEvolutionChain: React.FC<{
    evolutionChain: EvolutionChain;
}> = ({ evolutionChain }) => {
    const renderEvolution = (evolution: Evolution): JSX.Element => {
        return (
            <View style={styles.evolutionChain}>
                {evolution.species ? (
                    <View style={styles.pokemon}>
                        <GetPokemonPicture
                            name={evolution.species.name}
                            pictureSize={100}
                        />
                        <Text style={styles.name}>
                            {capitalizeFirstLetter(evolution.species.name)}
                        </Text>
                        {evolution.evolution_details[0] &&
                        evolution.evolution_details[0].trigger ? (
                            <EvolutionDetails evolution={evolution} />
                        ) : null}
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
        justifyContent: "center",
    },
    name: {
        textAlign: "center",
        fontSize: 16,
    },
    method: {
        flexWrap: "wrap",
        textAlign: "center",
        fontSize: 14,
        width: 120,
    },
});
