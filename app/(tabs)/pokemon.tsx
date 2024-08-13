import { RootState } from "@/state/store";
import { useAppSelector } from "@/state/hooks";
import { Image, StyleSheet, Dimensions } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import FindPokemon from "@/components/FindPokemon";
import PokemonInfo, { PokemonNameTypes } from "@/components/PokemonInfo";
import Moves from "@/components/MovesView";
import { ThemedView } from "@/components/ThemedView";
import ChooseView from "@/components/ChooseView";

export default function PokemonHomeScreen() {
    const data = useAppSelector((state: RootState) => state.pokemon.pokemon);
    const view = useAppSelector((state: RootState) => state.view.view);

    const defaultSprite =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

    return (
        <ParallaxScrollView
            headerBackgroundColor={{
                dark: "transparent",
                light: "transparent",
            }}
            backgroundImage={
                <Image
                    source={require("@/assets/images/battlescene.png")}
                    style={{ width: "100%", height: "112%" }}
                />
            }
            headerImage={
                <Image
                    source={
                        data?.sprites
                            ? { uri: data?.sprites.front_default }
                            : { uri: defaultSprite }
                    }
                    style={
                        data?.sprites
                            ? styles.pokemonSprite
                            : styles.pokeballSprite
                    }
                />
            }
        >
            <FindPokemon />
            {data ? (
                <ThemedView style={styles.stepContainer}>
                    <PokemonNameTypes data={data} />
                    <ChooseView />

                    {view === "stats" ? (
                        <PokemonInfo data={data} />
                    ) : view === "moves" ? (
                        <Moves data={data.moves} />
                    ) : null}
                </ThemedView>
            ) : null}
        </ParallaxScrollView>
    );
}

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    pokemonSprite: {
        height: 200,
        width: 200,
        bottom: 0,
        left: (width - 200) / 2,
        position: "absolute",
    },
    pokeballSprite: {
        height: 100,
        width: 100,
        left: (width - 100) / 2,
        bottom: 40,
        position: "absolute",
    },
    typeImage: {
        height: 20,
        width: 20,
    },
    name: {
        fontSize: 30,
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
    },
});
