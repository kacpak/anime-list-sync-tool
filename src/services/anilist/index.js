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
        const response = await axios.get(`${baseUrl}/${series_type}/search/${query}`, {
            headers: {
                Authorization: await getAuthorizationHeader()
            }
        });
        console.log('AniList search response', response.data);
        return response.data;
    } catch(e) {
        console.error('There was a problem during search', e.message);
        console.dir(e);
    }
}

