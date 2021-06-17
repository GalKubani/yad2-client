import Axios from 'axios'

const DB_URL = `http://localhost:4040`
export const getLocationsFromDB = async (searchValue) => {
    try {
        const res = await Axios.get(DB_URL + "/get-location-options?searchValue=" + searchValue)
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
export const subscribeToSite = async (email, password) => {
    try {
        const res = await Axios.post(DB_URL + `/users/add`, { email, password })
        return res.data
    } catch (err) {
        throw new Error(err);
    }
}

export const loginToDB = async (email, password) => {
    try {
        const res = await Axios.post(DB_URL + "/users/login", { email, password })
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}