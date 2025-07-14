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
