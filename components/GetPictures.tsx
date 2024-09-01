import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { addPokemon } from "@/state/pokemonSlice";
import { setView } from "@/state/viewSlice";
import { RootState } from "@/state/store";

type GetPokemonPictureProps = {
    name: string;
    pictureSize: number;
};

export const GetPokemonPicture: React.FC<GetPokemonPictureProps> = ({
    name,
    pictureSize,
}) => {
    const dispatch = useAppDispatch();
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    const [imgUrl, setImgUrl] = useState<string>("");
    const styles = StyleSheet.create({
        pokemonImage: {
            width: pictureSize,
            height: pictureSize,
            alignSelf: "center",
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
            setImgUrl(json.sprites.front_default);
        })
        .catch((error) => console.error(error));

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (!value) return;

        const url = "https://pokeapi.co/api/v2/pokemon/" + value;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(addPokemon(json));
            })
            .catch((error) => console.error(error));
    }, [value, dispatch]);

    const onPress = () => {
        setValue(name);
        dispatch(setView("stats"));
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <Image style={styles.pokemonImage} source={{ uri: imgUrl }} />
        </TouchableOpacity>
    );
};
