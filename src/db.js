import essentials from "./data/essential.json"
import magasins from "./data/magasins.json"

export async function getEssentials() {
    let essentialList = essentials
    return essentialList
}

export async function getMagasins() {
    let magasinList = magasins
    return magasinList
}
