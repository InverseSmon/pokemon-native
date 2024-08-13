export function FindTypeImage(type: string) {
    switch (type) {
        case "normal":
            return require("@/assets/images/normal.png");
        case "fire":
            return require("@/assets/images/fire.png");
        case "water":
            return require("@/assets/images/water.png");
        case "electric":
            return require("@/assets/images/electric.png");
        case "grass":
            return require("@/assets/images/grass.png");
        case "ice":
            return require("@/assets/images/ice.png");
        case "fighting":
            return require("@/assets/images/fighting.png");
        case "poison":
            return require("@/assets/images/poison.png");
        case "ground":
            return require("@/assets/images/ground.png");
        case "flying":
            return require("@/assets/images/flying.png");
        case "psychic":
            return require("@/assets/images/psychic.png");
        case "bug":
            return require("@/assets/images/bug.png");
        case "rock":
            return require("@/assets/images/rock.png");
        case "ghost":
            return require("@/assets/images/ghost.png");
        case "dragon":
            return require("@/assets/images/dragon.png");
        case "dark":
            return require("@/assets/images/dark.png");
        case "steel":
            return require("@/assets/images/steel.png");
        case "fairy":
            return require("@/assets/images/fairy.png");
        default:
            return require("@/assets/images/normal.png");
    }
}
