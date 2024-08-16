import { StyleSheet, Image, Platform, View } from "react-native";
import {
    TeamMemberCard,
    EmptySlot,
    AddPokemonButton,
} from "@/components/TeamCard";
import { useAppSelector, useAppDispatch } from "@/state/hooks";

export default function TeamScreen() {
    const teamLength = useAppSelector((state) => state.team.team.length);
    const team = useAppSelector((state) => state.team.team);

    return (
        <View style={styles.container}>
            {teamLength > 0
                ? team.map((pokemon: string) => (
                      <TeamMemberCard pokemon={pokemon} />
                  ))
                : null}
            {teamLength < 6 ? <AddPokemonButton /> : null}
            {teamLength < 6
                ? Array.from({ length: 5 - teamLength }).map((_, index) => (
                      <EmptySlot key={index} />
                  ))
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: 180,
    },
});
