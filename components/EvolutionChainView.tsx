import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { setSpeciesData, setEvolutionChain } from "@/state/evolutionSlice";
import { FormatEvolutionChain } from "@/components/FormatEvolutionChain";

type EvolutionChainViewProps = {
    data: string;
};

export const EvolutionChainView: React.FC<EvolutionChainViewProps> = ({
    data,
}) => {
    const dispatch = useAppDispatch();
    const speciesData = useAppSelector((state) => state.evolution.speciesData);
    const evolutionChain = useAppSelector(
        (state) => state.evolution.evolutionChain
    );

    useEffect(() => {
        if (!data) return;

        const url = "https://pokeapi.co/api/v2/pokemon-species/" + data;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(setSpeciesData(json));
            })
            .catch((error) => console.error(error));
    }, [data, dispatch]);

    useEffect(() => {
        if (!speciesData) return;

        const url = speciesData.evolution_chain.url;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                dispatch(setEvolutionChain(json));
            })
            .catch((error) => console.error(error));
    }, [speciesData]);

    return (
        <>
            {evolutionChain ? (
                <FormatEvolutionChain evolutionChain={evolutionChain} />
            ) : null}
        </>
    );
};
