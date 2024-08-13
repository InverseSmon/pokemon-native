import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    View,
} from "react-native";

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
            // borderWidth: 1,
            // borderColor: "#000000",
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
