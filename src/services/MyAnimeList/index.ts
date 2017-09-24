import axios from 'axios';
import parser from 'xml2json';
import env from '../../util/env';
import { SeriesType, LibraryEntry } from './types';

export async function searchAnime(query: string): Promise<any|undefined> {
    return search('anime', query);
}

export async function searchManga(query: string): Promise<any|undefined> {
    return search('manga', query);
}

export async function search(type: SeriesType, query: string): Promise<any|undefined> {
    try {
        const response = await axios.get(`https://myanimelist.net/api/${type}/search.xml`, {
            auth: {
                username: env.MAL_USERNAME,
                password: env.MAL_PASSWORD
            },
            params: {
                q: query
            }
        });

        return parser.toJson(response.data, {object: true});
    } catch(e) {
        console.error('Error', e);
    }
}

export async function getUserList(type: SeriesType): Promise<LibraryEntry[]> {
    try {
        const response = await axios.get(`https://myanimelist.net/malappinfo.php?u=${env.MAL_USERNAME}&status=all&type=${type}`);

        const { myanimelist: { [type]: results }} = parser.toJson(response.data, {object: true});
        return results;
    } catch(e) {
        console.error('Error getting MyAnimeList user list', e);
        return [];
    }
}