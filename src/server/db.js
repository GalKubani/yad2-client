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
export const subscribeToSite = async (userData) => {
    try {
        const res = await Axios.post(DB_URL + `/users/add`, userData)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const loginToDB = async (email, password) => {
    try {
        const res = await Axios.post(DB_URL + "/users/login", { email, password })
        return res;
    } catch (err) {
        throw new Error(err);
    }
}