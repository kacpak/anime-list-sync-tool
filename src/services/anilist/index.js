import axios from 'axios';
import {baseUrl} from './config';
import {getAuthorizationHeader} from './auth';

export async function searchAnime(query) {
    return search('anime', query);
}

export async function searchManga(query) {
    return search('manga', query);
}

async function search(series_type, query) {
    try {
        console.log(`${baseUrl}/${series_type}/search/${query}`);
        const response = await axios.get(`${baseUrl}/${series_type}/search/${query}`, {
            headers: {
                Authorization: await getAuthorizationHeader()
            }
        });
        console.log(response.data);
        return response.data;
    } catch(e) {
        console.error('There was a problem during search', e.message);
        console.dir(e);
    }
}

