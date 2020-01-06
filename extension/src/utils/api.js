import { common } from '../config';

const { apiUrl } = common;

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const get = async (endpoint = '/', params = {}, reqInfo = {}) => {
    const meta = {
        headers: { ...defaultHeaders },
        ...reqInfo,
    };    
    const url = new URL(`${apiUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const resp = await fetch(url, meta);
    return resp;
}