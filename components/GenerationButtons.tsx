import React, { useState, useEffect } from "react";
import { RootState } from "@/state/store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { StyleSheet, Text, View } from "react-native";
import { GenButton } from "@/components/StyledButton";
import { setGeneration, setVersion, setLearnMethod } from "@/state/moveSlice";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";

const VersionDropdown = () => {
    const versions: { [key: number]: { version: string; title: string }[] } = {
        1: [
            {
                version: "red-blue",
                title: "Red/Blue",
            },
            { version: "yellow", title: "Yellow" },
        ],
        2: [
            {
                version: "gold-silver",
                title: "Gold/Silver",
            },
            { version: "crystal", title: "Crystal" },
        ],
        3: [
            {
                version: "ruby-sapphire",
                title: "Ruby/Sapphire",
            },
            { version: "emerald", title: "Emerald" },
            {
                version: "firered-leafgreen",
                title: "Fire Red/Leaf Green",
            },
        ],
        4: [
            {
                version: "diamond-pearl",
                title: "Diamond/Pearl",
            },
            { version: "platinum", title: "Platinum" },
            {
                version: "heartgold-soulsilver",
                title: "HeartGold/SoulSilver",
            },
        ],
        5: [
            {
                version: "black-white",
                title: "Black/White",
            },
            {
                version: "black-2-white-2",
                title: "Black 2/White 2",
            },
        ],
        6: [
            {
                version: "x-y",
                title: "X/Y",
            },
            {
                version: "omega-ruby-alpha-sapphire",
                title: "Omega Ruby/Alpha Sapphire",
            },
        ],
        7: [
            {
                version: "sun-moon",
                title: "Sun/Moon",
            },
            {
                version: "ultra-sun-ultra-moon",
                title: "Ultra Sun/Ultra Moon",
            },
        ],
        8: [
            {
                version: "sword-shield",
                title: "Sword/Shield",
            },
        ],
    };

    const findTitleByVersion = (version: string) => {
        for (let key in versions) {
            for (let item of versions[key]) {
                if (item.version === version) {
                    return item.title;
                }
            }
        }
        return "";
    };

    const [gameVersion, setGameVersion] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    const dispatch = useAppDispatch();
    const currentGeneration = useAppSelector(
        (state: RootState) => state.movesView.generation
    );
    const currentVersion = useAppSelector(
        (state: RootState) => state.movesView.version
    );

    useEffect(() => {
        if (gameVersion !== "") {
            dispatch(setVersion(gameVersion));
            dispatch(setLearnMethod("level-up"));
        }
    }, [gameVersion]);

    const renderLabel = () => {
        return (
            <Text style={[styles.versionLabel, isFocus && { color: "blue" }]}>
                Game Version
            </Text>
        );
    };

    return (
        <>
            {renderLabel()}
            <Dropdown
                style={[
                    styles.versionDropdownPicker,
                    isFocus && { borderColor: "blue" },
                ]}
                value={gameVersion}
                data={versions[currentGeneration] || []}
                labelField={"title"}
                valueField={"version"}
                onChange={(item) => setGameVersion(item.version)}
                placeholder={findTitleByVersion(currentVersion)}
            />
        </>
    );
};

export const GenerationDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentGeneration = useAppSelector(
        (state: RootState) => state.movesView.generation
    );
    const values = [
        { label: "Generation 1", value: "1", version: "red-blue" },
        { label: "Generation 2", value: "2", version: "gold-silver" },
        { label: "Generation  3", value: "3", version: "ruby-sapphire" },
        { label: "Generation  4", value: "4", version: "diamond-pearl" },
        { label: "Generation  5", value: "5", version: "black-white" },
        { label: "Generation  6", value: "6", version: "x-y" },
        { label: "Generation  7", value: "7", version: "sun-moon" },
        { label: "Generation  8", value: "8", version: "sword-shield" },
    ];

    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (value !== "") {
            dispatch(setGeneration(parseInt(value)));
            dispatch(setVersion(values[parseInt(value) - 1].version));
            dispatch(setLearnMethod("level-up"));
        }
    }, [value]);

    const renderLabel = () => {
        return (
            <Text style={[styles.label, isFocus && { color: "blue" }]}>
                Generation
            </Text>
        );
    };

    return (
        <View style={styles.dropdownView}>
            {renderLabel()}
            <Dropdown
                style={[
                    styles.dropdownPicker,
                    isFocus && { borderColor: "blue" },
                ]}
                value={value}
                data={values}
                labelField={"value"}
                valueField={"value"}
                onChange={(item) => setValue(item.value)}
                placeholder={currentGeneration.toString()}
            />
            <VersionDropdown />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownList: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    dropdownPicker: {
        width: "30%",
        borderWidth: 1,
        borderColor: "navy",
        borderRadius: 4,
        height: 50,
        padding: 5,
    },
    versionDropdownPicker: {
        width: "60%",
        borderWidth: 1,
        borderColor: "navy",
        borderRadius: 4,
        height: 50,
        padding: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 20,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    versionLabel: {
        position: "absolute",
        backgroundColor: "white",
        left: "50%",
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    dropdownView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});
