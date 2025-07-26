import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


export async function getAllPicture() {
    try {
        const result = await axios.request("/pictures");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function getByCode(id) {
    try {
        const result = await axios.get(`/pictures/${id}`);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function insertPicture(body) {
    try {
        const result = await axios.post("/pictures", body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function removePicture(id) {
    try {
        const result = await axios.delete(`/pictures/${id}`);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

// export async function updateEssentials(body) {
//     try {
//         const result = await axios.put(`/essentials/${body.code}`, body);
//         return result.data
//     } catch (error) {
//         console.error('error', error)
//     }
// }
