import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export async function getAllMagasins() {
    try {
        const result = await axios.request("/magasins");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}
