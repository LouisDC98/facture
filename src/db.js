import essentials from "./data/essential.json"
import magasins from "./data/magasins.json"
import users from "./data/users.json"
import randomArticles from "./data/randomArticles.json"

export async function getEssentials() {
    let essentialList = essentials
    return essentialList
}

export async function getMagasins() {
    let magasinList = magasins
    return magasinList
}

export async function getUsers() {
    let userList = users
    return userList
}

export async function getRandomArticles() {
    let randomList = randomArticles
    return randomList
}
