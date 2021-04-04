import axios from './Axios';

export const postReq = async (url, data = {}, id = 0) => {
    let obj = {};
    try {
        if (id) {
            url = `${url}/${id}`;
        }
        let res = await axios.post(url, data);
        obj.data = res.data;
        obj.status = true;
    } catch (err) {
        console.log(err.response);
        obj.error = err?.response?.data?.error?.msg;
        obj.status = false;
    }
    return obj;
};

export const putReq = async (url, data = {}, id = 0) => {
    let obj = {};
    try {
        if (id) {
            url = `${url}/${id}`;
        }
        let res = await axios.put(url, data);
        obj.data = res.data;
        obj.status = true;
    } catch (err) {
        console.log(err.response);
        obj.error = err?.response?.data?.error?.msg;
        obj.status = false;
    }
    return obj;
};

export const delReq = async (url, data = {}, id = 0) => {
    let obj = {};
    try {
        if (id) {
            url = `${url}/${id}`;
        }
        let res = await axios.delete(url, data);
        obj.data = res.data;
        obj.status = true;
    } catch (err) {
        console.log(err.response);
        obj.error = err?.response?.data?.error?.msg;
        obj.status = false;
    }
    return obj;
};

export const getReq = async (url, params = {}) => {
    let obj = {};
    try {
        let res = await axios.get(url, { params });
        obj.data = res.data;
        obj.status = true;
    } catch (err) {
        console.log(err);
        obj.error = err?.response?.data?.error?.msg;
        obj.status = false;
    }
    return obj;
};