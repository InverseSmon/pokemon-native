import React from "react";
import { RootState } from "@/state/store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { StyleSheet, View } from "react-native";
import { VersionButton } from "@/components/StyledButton";
import { setVersion, setLearnMethod } from "@/state/moveSlice";

const generationConfig = {
    1: [
        {
            version: "red-blue",
            title1: "Red",
            title2: "Blue",
            text1colour: "#E61717",
            text2colour: "#173DE6",
        },
        { version: "yellow", title1: "Yellow", text1colour: "#F9DD2C" },
    ],
    2: [
        {
            version: "gold-silver",
            title1: "Gold",
            title2: "Silver",
            text1colour: "#E6D317",
            text2colour: "#B0BBBF",
        },
        { version: "crystal", title1: "Crystal", text1colour: "#99F8FF" },
    ],
    3: [
        {
            version: "ruby-sapphire",
            title1: "Ruby",
            title2: "Sapphire",
            text1colour: "#A20000",
            text2colour: "#001BA2",
        },
        { version: "emerald", title1: "Emerald", text1colour: "#5EC98C" },
        {
            version: "firered-leafgreen",
            title1: "FireRed",
            title2: "LeafGreen",
            text1colour: "#FF3D00",
            text2colour: "#00FF16",
        },
    ],
    4: [
        {
            version: "diamond-pearl",
            title1: "Diamond",
            title2: "Pearl",
            text1colour: "#00EEFF",
            text2colour: "#C28ED7",
        },
        { version: "platinum", title1: "Platinum", text1colour: "#989898" },
        {
            version: "heartgold-soulsilver",
            title1: "HeartGold",
            title2: "SoulSilver",
            text1colour: "#E6D317",
            text2colour: "#B0BBBF",
        },
    ],
    5: [
        {
            version: "black-white",
            title1: "Black",
            title2: "White",
            text1colour: "#000000",
            text2colour: "#ffffff",
        },
        {
            version: "black-2-white-2",
            title1: "Black 2",
            title2: "White 2",
            text1colour: "#000000",
            text2colour: "#ffffff",
        },
    ],
    6: [
        {
            version: "x-y",
            title1: "X",
            title2: "Y",
            text1colour: "#E61717",
            text2colour: "#173DE6",
        },
        {
            version: "omega-ruby-alpha-sapphire",
            title1: "Omega Ruby",
            title2: "Alpha Sapphire",
            text1colour: "#A20000",
            text2colour: "#001BA2",
        },
    ],
    7: [
        {
            version: "sun-moon",
            title1: "Sun",
            title2: "Moon",
            text1colour: "#FFA500",
            text2colour: "#2376BE",
        },
        {
            version: "ultra-sun-ultra-moon",
            title1: "Ultra Sun",
            title2: "Ultra Moon",
            text1colour: "#F26F2D",
            text2colour: "#9434B7",
        },
    ],
    8: [
        {
            version: "sword-shield",
            title1: "Sword",
            title2: "Shield",
            text1colour: "#1F92BC",
            text2colour: "#E6335D",
        },
    ],
};

export const VersionButtons: React.FC = () => {
    const dispatch = useAppDispatch();
    const generation = useAppSelector(
        (state: RootState) => state.movesView.generation
    );
    const version = useAppSelector(
        (state: RootState) => state.movesView.version
    );

    return (
        <View style={styles.buttonList}>
            {generationConfig[generation as keyof typeof generationConfig]?.map(
                (item) => (
                    <VersionButton
                        key={item.version}
                        onPress={() => {
                            dispatch(setVersion(item.version));
                            dispatch(setLearnMethod("level-up"));
                        }}
                        title1={item.title1}
                        title2={item.title2 || ""}
                        text1colour={item.text1colour}
                        text2colour={item.text2colour || ""}
                        backgroundColour={
                            version === item.version ? "#1f92bc" : "#d8f0f9"
                        }
                    />
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonList: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: 8,
    },
});
