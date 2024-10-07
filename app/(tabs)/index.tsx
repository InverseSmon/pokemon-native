import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PokedexCard } from "@/components/PokedexCard";
import { RootState } from "@/state/store";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
    setGeneration as setPokedexGeneration,
    selectGeneration,
} from "@/state/pokedexSlice";
import { PokedexDropdown } from "@/components/GenerationButtons";

export default function HomeScreen() {
    const currentGeneration = useAppSelector(
        (state: RootState) => state.pokedex.currentGeneration
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/pokedex-kanto.png")}
                    style={styles.reactLogo}
                />
            }
            backgroundImage={
                <Image
                    source={require("@/assets/images/pokedex-kanto.png")}
                    style={{ width: "100%", height: 200 }}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <PokedexDropdown />
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                {currentGeneration.map((pokedexNumber) => {
                    return (
                        <PokedexCard
                            key={pokedexNumber}
                            pokedexNumber={pokedexNumber}
                        />
                    );
                })}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
