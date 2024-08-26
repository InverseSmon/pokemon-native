import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { capitalizeFirstLetter } from "@/components/PokemonInfo";
const types = [
    {
        type: "normal",
        color: "#9099a1",
        imgSrc: require("@/assets/images/normal.png"),
    },
    {
        type: "fire",
        color: "#ff9c54",
        imgSrc: require("@/assets/images/fire.png"),
    },
    {
        type: "water",
        color: "#4d90d5",
        imgSrc: require("@/assets/images/water.png"),
    },
    {
        type: "electric",
        color: "#f3d23b",
        imgSrc: require("@/assets/images/electric.png"),
    },
    {
        type: "grass",
        color: "#63bb5b",
        imgSrc: require("@/assets/images/grass.png"),
    },
    {
        type: "ice",
        color: "#74cec0",
        imgSrc: require("@/assets/images/ice.png"),
    },
    {
        type: "fighting",
        color: "#ce4069",
        imgSrc: require("@/assets/images/fighting.png"),
    },
    {
        type: "poison",
        color: "#ab6ac8",
        imgSrc: require("@/assets/images/poison.png"),
    },
    {
        type: "ground",
        color: "#d97746",
        imgSrc: require("@/assets/images/ground.png"),
    },
    {
        type: "flying",
        color: "#92aade",
        imgSrc: require("@/assets/images/flying.png"),
    },
    {
        type: "psychic",
        color: "#f97176",
        imgSrc: require("@/assets/images/psychic.png"),
    },
    {
        type: "bug",
        color: "#90c12c",
        imgSrc: require("@/assets/images/bug.png"),
    },
    {
        type: "rock",
        color: "#c7b78b",
        imgSrc: require("@/assets/images/rock.png"),
    },
    {
        type: "ghost",
        color: "#5269ac",
        imgSrc: require("@/assets/images/ghost.png"),
    },
    {
        type: "dragon",
        color: "#096dc4",
        imgSrc: require("@/assets/images/dragon.png"),
    },
    {
        type: "dark",
        color: "#5a5366",
        imgSrc: require("@/assets/images/dark.png"),
    },
    {
        type: "steel",
        color: "#5a8ea1",
        imgSrc: require("@/assets/images/steel.png"),
    },
    {
        type: "fairy",
        color: "#ec8fe6",
        imgSrc: require("@/assets/images/fairy.png"),
    },
];

export const MoveCard = ({
    name,
    power,
    accuracy,
    pp,
    type,
}: {
    name: string;
    power: number;
    accuracy: number;
    pp: number;
    type: string;
}) => {
    const styles = StyleSheet.create({
        card: {
            backgroundColor: types.find((t) => t.type === type)?.color,
            padding: 5,
            margin: 5,
            borderRadius: 15,
            width: "80%",
        },
        name: {
            textAlign: "center",
            fontSize: 20,
            color: "#FFFFFF",
        },
        text: {
            textAlign: "center",
            fontSize: 15,
            color: "#FFFFFF",
        },
        image: {
            width: 30,
            height: 30,
            borderRadius: 30,
            borderWidth: 2,
            margin: 5,
            borderColor: "#FFFFFF",
        },
        view: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
        },
        typeView: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <>
            <View style={styles.card}>
                <View style={styles.view}>
                    <Text style={styles.name}>{name}</Text>

                    {type ? (
                        <View style={styles.typeView}>
                            <Image
                                style={styles.image}
                                source={
                                    types.find((t) => t.type === type)?.imgSrc
                                }
                            />
                            <Text style={styles.text}>
                                {capitalizeFirstLetter(type)}
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>
                        Power: {power ? String(power) : "-"}
                    </Text>
                    <Text style={styles.text}>
                        Accuracy: {accuracy ? String(accuracy) : "-"}
                    </Text>
                    <Text style={styles.text}>PP: {String(pp)}</Text>
                </View>
            </View>
        </>
    );
};
