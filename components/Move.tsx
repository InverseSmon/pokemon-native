import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { MoveCard } from "./MoveCard";

function formatMoveName(name: string) {
    return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

interface MoveDetail {
    name: string;
    // method: string;
}

interface MoveProps {
    moveRawData: string;
}

interface MoveData {
    name: string;
    power: number;
    accuracy: number;
    pp: number;
    type: { name: string };
}

const Move: React.FC<MoveProps> = ({ moveRawData }) => {
    const [move, setMove] = useState<MoveData | null>(null);

    useEffect(() => {
        if (!moveRawData) return;

        const url = "https://pokeapi.co/api/v2/move/" + moveRawData;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    return;
                }
                return response.json();
            })
            .then((json) => {
                setMove(json);
            })
            .catch((error) => console.error(error));
    }, [moveRawData]);

    return move ? (
        <MoveCard
            name={formatMoveName(move.name)}
            power={move.power}
            accuracy={move.accuracy}
            pp={move.pp}
            type={move.type.name}
            // method={moveRawData.method}
        />
    ) : null;
};

export default Move;
