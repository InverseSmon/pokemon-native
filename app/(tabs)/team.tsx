import { StyleSheet, Image, Platform, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import {
    TeamMemberCard,
    EmptySlot,
    AddPokemonButton,
} from "@/components/TeamCard";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { MemberModal } from "@/components/MemberModal";

export default function TeamScreen() {
    const teamLength = useAppSelector((state) => state.team.team.length);
    const team = useAppSelector((state) => state.team.team);
    const modalPokemon = useAppSelector((state) => state.team.modalPokemon);

    return (
        <>
            <ThemedText type={"title"} style={styles.title}>
                Team Builder
            </ThemedText>
            <View style={styles.container}>
                {teamLength > 0
                    ? team.map((pokemon: string, index: number) => (
                          <TeamMemberCard
                              pokemon={pokemon}
                              teamPosition={index}
                          />
                      ))
                    : null}
                {teamLength < 6 ? <AddPokemonButton /> : null}
                {teamLength < 6
                    ? Array.from({ length: 5 - teamLength }).map((_, index) => (
                          <EmptySlot key={index} />
                      ))
                    : null}
            </View>
            <MemberModal name={modalPokemon} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: 100,
    },
    title: {
        textAlign: "center",
        paddingTop: 80,
    },
});
