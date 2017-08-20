import axios from 'axios';
import {baseUrl} from './config';
import {getAuthorizationHeader} from './auth';
import db from '../../storage';
import getUser from './user';

export async function searchAnime(query) {
    return search('anime', query);
}

export async function searchManga(query) {
    return search('manga', query);
}

export async function listAnime() {
    const userList = await getUserList('anime');
    return userList.lists;
}

export async function listManga() {
    const userList = await getUserList('manga');
    return userList.lists;
}

async function search(series_type, query) {
    try {
        const response = await axios.get(`${baseUrl}/${series_type}/search/${query}`, {
            headers: {
                Authorization: await getAuthorizationHeader()
            }
        });
        return response.data;
    } catch(e) {
        console.error('There was a problem during search', e.message);
        console.dir(e);
    }
}

async function getUserList(series_type) {
    try {
        const user = await getUser();
        const response = await axios.get(`${baseUrl}/user/${user.id}/${series_type}list`, {
            headers: {
                Authorization: await getAuthorizationHeader()
            }
        });
        return response.data;
    } catch(e) {
        console.error('There was a problem during user list fetch', e.message);
        console.dir(e);
    }
}