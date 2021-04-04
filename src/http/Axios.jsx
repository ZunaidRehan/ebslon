import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_SERVER_URL;

const instance = axios.create({
    baseURL: apiBaseUrl
});

//set token to user request.
/**
 * @param token set token to axiox
 */
export const setToken = token => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
}

export default instance;