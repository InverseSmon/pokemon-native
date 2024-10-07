import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { splitAndCapitalize } from "./PokemonInfo";
import { GetAbilities } from "./GetAbilities";
import { PokemonData } from "@/state/pokemonSlice";
import { setLargeCard } from "@/state/pokedexSlice";
import PokemonInfo, { PokemonHeightWeight } from "./PokemonInfo";

export type SpeciesData = {
    name: string;
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
};

const formatFlavorText = (flavorText: string) => {
    return flavorText.replace(/(\r\n|\n|\r|♀)/gm, " ");
};

const returnEnglishFlavorText = (species: SpeciesData) => {
    return species.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
    );
};

export const PokedexCard: React.FC<{ pokedexNumber: number }> = ({
    pokedexNumber,
}) => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [species, setSpecies] = useState<SpeciesData>();
    const name = pokemon ? splitAndCapitalize(pokemon?.name) : "";
    const largeCard = useAppSelector((state) => state.pokedex.largeCard);
    const dispatch = useAppDispatch();

    const flavorText = species
        ? returnEnglishFlavorText(species)?.flavor_text
        : "";

    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon/" + pokedexNumber;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                setPokemon(json);
            })
            .catch((error) => console.error(error));
    }, [pokedexNumber]);

    useEffect(() => {
        if (!pokemon) return;

        const url =
            "https://pokeapi.co/api/v2/pokemon-species/" + pokedexNumber;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                setSpecies(json);
                //console.log(flavorText);
            })
            .catch((error) => console.error(error));
    }, [pokemon]);

    const onPressOpen = () => {
        dispatch(setLargeCard(pokedexNumber));
    };

    const onPressClose = () => {
        dispatch(setLargeCard(0));
    };

    return largeCard === pokedexNumber ? (
        <TouchableOpacity style={styles.largeCard} onPress={onPressClose}>
            <View style={styles.imagesView}>
                <Image
                    source={{ uri: pokemon?.sprites.front_default }}
                    style={styles.largeImage}
                />
                <Image
                    source={{ uri: pokemon?.sprites.front_shiny }}
                    style={styles.largeImage}
                />
            </View>
            <Text style={styles.name}>
                #{pokedexNumber} {name}
            </Text>
            <View style={styles.info}>
                <GetAbilities pokemon={pokemon} />
                <PokemonHeightWeight data={pokemon} />
            </View>
            <Text style={styles.flavor}>
                {flavorText ? formatFlavorText(flavorText) : ""}
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.pokedexCard} onPress={onPressOpen}>
            <Image
                source={{ uri: pokemon?.sprites.front_default }}
                style={styles.image}
            />
            <Text style={styles.name}>#{pokedexNumber}</Text>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pokedexCard: {
        backgroundColor: "red",
        width: "31%",
        height: 150,
        borderRadius: 25,
        margin: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    largeCard: {
        backgroundColor: "red",
        width: "100%",
        height: 450,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    imagesView: {
        flexDirection: "row",
        gap: 10,
    },
    image: {
        width: 80,
        height: 80,
        backgroundColor: "white",
        borderRadius: 25,
    },
    largeImage: {
        width: 120,
        height: 120,
        backgroundColor: "white",
        borderRadius: 25,
        margin: 10,
    },
    info: {
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        gap: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    flavor: {
        fontSize: 15,
        color: "white",
        width: "90%",
        textAlign: "left",
        margin: 20,
    },
});
