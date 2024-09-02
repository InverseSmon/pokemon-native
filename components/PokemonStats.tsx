import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type PokemonStatsData = {
    stats: {
        0: {
            base_stat: number;
        };
        1: {
            base_stat: number;
        };
        2: {
            base_stat: number;
        };
        3: {
            base_stat: number;
        };
        4: {
            base_stat: number;
        };
        5: {
            base_stat: number;
        };
    };
};

function StatsBar({ stat, value }: { stat: string; value: number }) {
    return (
        <View style={styles.statContainer}>
            <Text style={styles.statsText}>
                {stat}: {value}
            </Text>
            <View
                style={
                    value < 20
                        ? [styles.barRed, { width: `${value / 3.5}%` }]
                        : value >= 20 && value < 50
                        ? [styles.barOrange, { width: `${value / 3.5}%` }]
                        : value >= 50 && value < 90
                        ? [styles.barYellow, { width: `${value / 3.5}%` }]
                        : value >= 90 && value < 150
                        ? [styles.barGreen, { width: `${value / 3.5}%` }]
                        : value >= 150
                        ? [styles.barDarkGreen, { width: `${value / 3.5}%` }]
                        : {}
                }
            />
        </View>
    );
}

export default function PokemonStats({ name }: { name: string }) {
    const [data, setData] = useState<PokemonStatsData | null>(null);

    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon/" + name;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => setData(json))
            .catch((error) => console.error(error));
    }, [name]);

    return (
        <>
            <View style={styles.stats}>
                <StatsBar stat="HP" value={data?.stats[0].base_stat || 0} />
                <StatsBar stat="Attack" value={data?.stats[1].base_stat || 0} />
                <StatsBar
                    stat="Defense"
                    value={data?.stats[2].base_stat || 0}
                />
                <StatsBar stat="Sp Att" value={data?.stats[3].base_stat || 0} />
                <StatsBar stat="Sp Def" value={data?.stats[4].base_stat || 0} />
                <StatsBar stat="Speed" value={data?.stats[5].base_stat || 0} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    stats: {
        marginTop: 10,
        marginLeft: 10,
    },
    statContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    barContainer: {
        flex: 1,
        height: 20,
        borderColor: "#000",
        borderWidth: 1,
        marginLeft: 10,
    },
    barDarkGreen: {
        height: 20,
        backgroundColor: "#1BC22F",
    },
    barGreen: {
        height: 20,
        backgroundColor: "#8DFF0A",
    },
    barYellow: {
        height: 20,
        backgroundColor: "#FAD73C",
    },
    barOrange: {
        height: 20,
        backgroundColor: "#F19143",
    },
    barRed: {
        height: 20,
        backgroundColor: "#F55536",
    },
    statsText: {
        width: 100,
    },
});
