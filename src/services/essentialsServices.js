import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export async function getAllEssentials() {
    try {
        const result = await axios.request("/essentials");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function insertEssential(body) {
    try {
        const result = await axios.post("/essentials", body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}
