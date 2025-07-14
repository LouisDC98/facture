import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export async function getAllUser() {
    try {
        const result = await axios.request("/users");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}
