import axios from 'axios';

axios.defaults.baseURL = 'http://109.111.55.158:3000';


export async function getAllPicture() {
    try {
        const result = await axios.request("/pictures");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function getByCode(id, multiple = false) {
    try {
        const url = multiple ? `/pictures/${id}?multiple=true` : `/pictures/${id}`;
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.error('error', error);
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
