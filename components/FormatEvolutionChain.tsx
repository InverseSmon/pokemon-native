import React, { useMemo, useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { ThemedView } from "@/components/ThemedView";
import { GenerationDropdown } from "@/components/GenerationButtons";
import { VersionButtons } from "@/components/VersionButtons";
import VersionMoves, { populateMovesLists } from "@/components/MovesSort";
import { setSpeciesData, setEvolutionChain } from "@/state/evolutionSlice";
import { EvolutionChain } from "@/state/evolutionSlice";

// type EvolutionChain = {
//     chain: {
//         evolution_details: {
//             min_level: number;
//             trigger: {
//                 name: string;
//             };
//         }[];
//         species: {
//             name: string;
//         };
//         evolves_to: {
//             species: {
//                 name: string;
//             };
//             evolution_details: {
//                 min_level: number;
//                 trigger: {
//                     name: string;
//                 };
//             }[];
//             evolves_to: {
//                 species: {
//                     name: string;
//                 };
//                 evolution_details: {
//                     min_level: number;
//                     trigger: {
//                         name: string;
//                     };
//                 }[];
//             }[];
//         }[];
//     };
// };

// export const FormatEvolutionChain: React.FC<{
//     evolutionChain: EvolutionChain;
// }> = ({ evolutionChain }) => {
//     return (
//         <>
//             {evolutionChain
//                 ? evolutionChain.chain.evolves_to.map((evolution) => (
//                       <>
//                           <Text>{evolutionChain.chain.species.name}</Text>
//                           {evolution.species ? (
//                               <>
//                                   <Text>
//                                       {
//                                           evolution.evolution_details[0].trigger
//                                               .name
//                                       }
//                                   </Text>
//                                   <Text>{evolution.species.name}</Text>
//                               </>
//                           ) : null}
//                           {evolution.evolves_to[0]
//                               ? evolutionChain.chain.evolves_to[0].evolves_to.map(
//                                     (evolution) => (
//                                         <>
//                                             <Text>
//                                                 {
//                                                     evolution
//                                                         .evolution_details[0]
//                                                         .trigger.name
//                                                 }
//                                             </Text>
//                                             <Text>
//                                                 {evolution.species.name}
//                                             </Text>
//                                         </>
//                                     )
//                                 )
//                               : null}
//                       </>
//                   ))
//                 : null}
//         </>
//    );
//};

export const FormatEvolutionChain: React.FC<{
    evolutionChain: EvolutionChain;
}> = ({ evolutionChain }) => {
    const renderEvolution = (evolution: any) => {
        return (
            <>
                {evolution.species ? (
                    <>
                        {evolution.evolution_details[0] &&
                        evolution.evolution_details[0].trigger ? (
                            <Text>
                                {evolution.evolution_details[0].trigger.name}
                            </Text>
                        ) : null}
                        <Text>{evolution.species.name}</Text>
                    </>
                ) : null}
                {evolution.evolves_to.map((nextEvolution: any) =>
                    renderEvolution(nextEvolution)
                )}
            </>
        );
    };

    return <>{evolutionChain ? renderEvolution(evolutionChain.chain) : null}</>;
};
