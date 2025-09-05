import axios from 'axios';

axios.defaults.baseURL = 'http://109.111.55.158:3000';


export async function getAllProfiles() {
    try {
        const result = await axios.request("/profiles");
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function insertProfile(body) {
    try {
        const result = await axios.post("/profiles", body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function removeProfile(profileID) {
    try {
        const result = await axios.delete(`/profiles/${profileID}`);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

export async function updateProfile(body) {
    try {
        const result = await axios.put(`/profiles/${body.profileID}`, body);
        return result.data
    } catch (error) {
        console.error('error', error)
    }
}

