import { Tabs } from "expo-router";
import React from "react";
import {
    TabBarIcon,
    PokemonTabBarIcon,
    SearchTabBarIcon,
} from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "@react-navigation/native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Pokedex",
                    tabBarIcon: ({ color }) => (
                        <PokemonTabBarIcon name={"pokeball"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="pokemon"
                options={{
                    title: "Find Pokemon",
                    tabBarIcon: ({ color }) => (
                        <SearchTabBarIcon name={"search1"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="team"
                options={{
                    title: "Team Builder",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name={"grid-outline"} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
