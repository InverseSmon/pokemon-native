import { RootState } from "@/state/store";
import { useAppSelector } from "@/state/hooks";
import { View, Image, StyleSheet, Dimensions } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import FindPokemon from "@/components/FindPokemon";
import PokemonInfo, { NameTypesWithControls } from "@/components/PokemonInfo";
import Moves from "@/components/MovesView";
import { ThemedView } from "@/components/ThemedView";
import ChooseView from "@/components/ChooseView";
import { EvolutionChainView } from "@/components/EvolutionChainView";
// import AddPokemonToTeam from "@/components/AddPokemonToTeam";

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
                    <View style={styles.nameButton}>
                        <NameTypesWithControls data={data} />
                    </View>
                    <ChooseView />
                    <View style={view === "stats" ? styles.flex : styles.none}>
                        <PokemonInfo data={data} />
                    </View>
                    <View style={view === "moves" ? styles.flex : styles.none}>
                        <Moves data={data.moves} id={data.id} />
                    </View>
                    <View
                        style={view === "evolution" ? styles.flex : styles.none}
                    >
                        <EvolutionChainView data={data?.name} />
                    </View>
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
    flex: {
        display: "flex",
    },
    none: {
        display: "none",
    },
    nameButton: {
        flexDirection: "column",
        justifyContent: "space-around",
    },
});
