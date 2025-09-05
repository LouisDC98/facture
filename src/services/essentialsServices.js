import axios from 'axios';

axios.defaults.baseURL = 'http://109.111.55.158:3000';


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

export async function removeEssentials(code) {
    try {
        const result = await axios.delete(`/essentials/${code}`);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function updateEssentials(body) {
    try {
        const result = await axios.put(`/essentials/${body.code}`, body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}
