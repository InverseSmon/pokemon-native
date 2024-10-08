// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

export function TabBarIcon({
    style,
    ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
    return (
        <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
    );
}

export function PokemonTabBarIcon({
    style,
    ...rest
}: IconProps<ComponentProps<typeof MaterialCommunityIcons>["name"]>) {
    return (
        <MaterialCommunityIcons
            size={28}
            style={[{ marginBottom: -3 }, style]}
            {...rest}
        />
    );
}

export function SearchTabBarIcon({
    style,
    ...rest
}: IconProps<ComponentProps<typeof AntDesign>["name"]>) {
    return (
        <AntDesign size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
    );
}
