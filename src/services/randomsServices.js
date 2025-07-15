import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export async function getAllRandoms() {
    try {
        const result = await axios.request("/randoms");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function insertRandom(body) {
    try {
        const result = await axios.post("/randoms", body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function removeRandom(code) {
    try {
        const result = await axios.delete(`/randoms/${code}`);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

