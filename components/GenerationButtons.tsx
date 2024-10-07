import React, { useState, useEffect } from "react";
import { RootState } from "@/state/store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { StyleSheet, Text, View } from "react-native";
import { GenButton } from "@/components/StyledButton";
import { setGeneration, setVersion, setLearnMethod } from "@/state/moveSlice";
import {
    setGeneration as setPokedexGeneration,
    selectGeneration,
} from "@/state/pokedexSlice";
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

export const PokedexDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentGeneration = useAppSelector(
        (state: RootState) => state.pokedex.currentGeneration
    );

    const [value, setValue] = useState<string>("");
    const [array, setArray] = useState<number[]>([]);

    const renderLabel = () => {
        return <Text style={[styles.label]}>Generation</Text>;
    };

    const values = [
        {
            label: "Generation 1",
            value: "gen1",
            array: Array.from({ length: 151 }, (_, i) => i + 1),
        },
        {
            label: "Generation 2",
            value: "gen2",
            array: Array.from({ length: 252 - 152 }, (_, i) => i + 152),
        },
        {
            label: "Generation  3",
            value: "gen3",
            array: Array.from({ length: 387 - 252 }, (_, i) => i + 252),
        },
        {
            label: "Generation  4",
            value: "gen4",
            array: Array.from({ length: 494 - 387 }, (_, i) => i + 387),
        },
        {
            label: "Generation  5",
            value: "gen5",
            array: Array.from({ length: 650 - 494 }, (_, i) => i + 494),
        },
        {
            label: "Generation  6",
            value: "gen6",
            array: Array.from({ length: 722 - 650 }, (_, i) => i + 650),
        },
        {
            label: "Generation  7",
            value: "gen7",
            array: Array.from({ length: 810 - 722 }, (_, i) => i + 722),
        },
        {
            label: "Generation  8",
            value: "gen8",
            array: Array.from({ length: 906 - 810 }, (_, i) => i + 810),
        },
        {
            label: "Generation  9",
            value: "gen9",
            array: Array.from({ length: 1026 - 906 }, (_, i) => i + 906),
        },
        {
            label: "All Generations",
            value: "all",
            array: Array.from({ length: 1025 }, (_, i) => i + 1),
        },
    ];

    useEffect(() => {
        if (value !== "") {
            dispatch(setPokedexGeneration(array));
            //console.log(currentGeneration, value);
        }
    }, [value]);

    return (
        <View style={styles.dropdownView}>
            {renderLabel()}
            <Dropdown
                style={[styles.pokedexDropdownPicker]}
                value={value}
                data={values}
                labelField={"label"}
                valueField={"value"}
                onChange={(item) => {
                    setValue(item.label);
                    setArray(item.array);
                }}
                placeholder={value}
            />
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
    pokedexDropdownPicker: {
        width: "90%",
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
