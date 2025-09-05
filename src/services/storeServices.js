import axios from 'axios';

axios.defaults.baseURL = 'http://109.111.55.158:3000';


export async function getAllStores() {
    try {
        const result = await axios.request("/stores");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function insertStore(body) {
    try {
        const result = await axios.post("/stores", body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function removeStore(id) {
    try {
        const result = await axios.delete(`/stores/${id}`);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function updateStore(body) {
    try {
        const result = await axios.put(`/stores/${body.id}`, body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}
