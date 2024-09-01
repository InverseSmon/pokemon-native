import React from "react";
import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { useAppDispatch } from "@/state/hooks";
import { addPokemon, PokemonData } from "@/state/pokemonSlice";
import { useNavigation } from "@react-navigation/native";
import { setNumber, setText } from "@/state/searchPokemonSlice";

export const GenButton = ({
    onPress,
    title,
    underline,
}: {
    onPress: () => void;
    title: string;
    underline: boolean;
}) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "ffffff",
            padding: 5,
            margin: 5,
            marginBottom: 0,
            borderBottomWidth: underline ? 2 : 0,
        },
        text: {
            textAlign: "center",
            fontSize: 20,
            color: "#000000",
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export const NameNumberButton = ({
    onPress,
    title,
    highlight,
}: {
    onPress: () => void;
    title: string;
    highlight: boolean;
}) => {
    const styles = StyleSheet.create({
        button: {
            // backgroundColor: highlight ? "#3396FF" : "#ffffff",
            backgroundColor: "#ffffff",

            width: 125,
            padding: 3,
            margin: 5,
            marginTop: 0,
            borderBottomWidth: highlight ? 2 : 0,
            // borderRadius: 5,
            borderColor: "#3396FF",
        },
        text: {
            textAlign: "center",
            fontSize: 20,
            color: highlight ? "#3396FF" : "#000000",
            // color: "#3396FF",
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export const VersionButton = ({
    onPress,
    title1,
    title2,
    text1colour,
    text2colour,
    backgroundColour,
}: {
    onPress: () => void;
    title1: string;
    title2: string;
    text1colour: string;
    text2colour: string;
    backgroundColour: string;
}) => {
    const styles = StyleSheet.create({
        button: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: backgroundColour,
            padding: 5,
            borderRadius: 5,
            margin: 5,
        },
        text1: {
            fontSize: 18,
            color: text1colour,
        },
        text2: {
            fontSize: 18,
            color: text2colour,
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text1}>{title1}</Text>
            <Text> </Text>
            <Text style={styles.text2}>{title2}</Text>
        </TouchableOpacity>
    );
};

export const FindButton = ({
    title,
    onPress,
    selected,
}: {
    title: string;
    onPress: () => void;
    selected: boolean;
}) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            backgroundColor: selected ? "#1f92bc" : "#d8f0f9",
            padding: 5,
            margin: 5,
            borderRadius: 5,
            width: 200,
        },
        text: {
            textAlign: "center",
            fontSize: 20,
            color: selected ? "#ffffff" : "#000000",
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export const TeamButton = ({ title }: { title: string }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const onPress = () => {
        dispatch(addPokemon(null as never));
        navigation.navigate("pokemon" as never);
        dispatch(setNumber(""));
        dispatch(setText(""));
    };

    const styles = StyleSheet.create({
        button: {
            backgroundColor: "white",
            // padding: 5,
            margin: 5,
            borderRadius: 5,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
        },
        plus: {
            width: "80%",
            height: "80%",
            // color: "blue",
            backgroundColor: "transparent",
        },
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image
                source={require("@/assets/images/add.png")}
                style={styles.plus}
            />
        </TouchableOpacity>
    );
};

export const AddPokemonToTeamButton = ({
    onPress,
}: {
    onPress: () => void;
}) => {
    const styles = StyleSheet.create({
        buttonView: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 160,
            right: 20,
            zIndex: 10,
        },
        button: {
            alignItems: "center",
            justifyContent: "center",
        },
        plus: {
            width: 30,
            height: 30,
            borderRadius: 20,
            color: "white",
            backgroundColor: "green",
        },
    });

    return (
        <View style={styles.buttonView}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Image
                    source={require("@/assets/images/add.png")}
                    style={styles.plus}
                />
                <Text>Add to team</Text>
            </TouchableOpacity>
        </View>
    );
};

export const RemovePokemonFromTeamButton = ({
    onPress,
}: {
    onPress: () => void;
}) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "red",
            borderRadius: 15,
            width: 30,
            height: 30,
            alignSelf: "center",
            justifyContent: "center",
        },
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={require("@/assets/images/close.png")}
                style={styles.button}
            />
        </TouchableOpacity>
    );
};

export const PreviousNextButton = ({
    onPress,
    previous,
}: {
    onPress: () => void;
    previous: boolean;
}) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "#3396FF",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            margin: 5,
            borderRadius: 15,
            width: 30,
            height: 30,
        },
        imageLeft: {
            width: 30,
            height: 30,
            marginRight: 2,
        },
        imageRight: {
            width: 30,
            height: 30,
            marginLeft: 2,
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            {previous ? (
                <Image
                    style={styles.imageLeft}
                    source={require("@/assets/images/left.png")}
                />
            ) : (
                <Image
                    style={styles.imageRight}
                    source={require("@/assets/images/right.png")}
                />
            )}
        </TouchableOpacity>
    );
};
