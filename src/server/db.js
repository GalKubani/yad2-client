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
export const getCityOptionsFromDB = async (searchValue) => {
    try {
        const res = await Axios.get(DB_URL + "/search-city?searchValue=" + searchValue)
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
export const getCityDataFromDB = async (searchValue) => {
    try {
        const res = await Axios.get(DB_URL + "/get-city-streets?searchValue=" + searchValue)
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
export const editPersonalData = async (updatedData, token) => {
    try {
        const res = await Axios.patch(DB_URL + "/users/me", updatedData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return res.data
    } catch (err) {
        throw new Error(err);
    }
}
export const addNewAdvert = async (formData, token) => {
    try {
        const res = await Axios.post(DB_URL + "/adverts/new", formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return res.data
    } catch (err) {
        throw new Error(err);
    }
}
export const addAdvertMedia = async (mediaData, token, advertId) => {
    try {
        if (mediaData.assetPictures) {
            let parsedData = new FormData
            for (let file of mediaData.assetPictures) {
                if (file) { parsedData.append("assetPictures", file) }
            }
            await Axios.post(DB_URL + "/adverts/add-pictures?id=" + advertId, parsedData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            })
        }
        if (mediaData.assetVideo) {
            await Axios.post(DB_URL + "/adverts/add-video?id=" + advertId, mediaData.assetVideo, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            })
        }
        return
    } catch (err) {
        throw new Error(err);
    }
}
export const findUserAdverts = async (token) => {
    try {
        const res = await Axios.get(DB_URL + "/adverts/get-user", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}