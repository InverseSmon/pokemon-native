import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";

type GetPokemonPictureProps = {
    name: string;
    pictureSize: number;
};

export const GetPokemonPicture: React.FC<GetPokemonPictureProps> = ({
    name,
    pictureSize,
}) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    const [imgUrl, setImgUrl] = useState<string>("");
    const styles = StyleSheet.create({
        pokemonImage: {
            width: pictureSize,
            height: pictureSize,
        },
    });

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                return;
            }
            return response.json();
        })
        .then((json) => {
            console.log(json.sprites.front_default);
            setImgUrl(json.sprites.front_default);
        })
        .catch((error) => console.error(error));

    return <Image style={styles.pokemonImage} source={{ uri: imgUrl }} />;
};
