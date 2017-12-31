import axios from 'axios';
import { promisify } from 'util';
import * as xml2js from 'xml2js';
import env from '../../util/env';
import { SeriesType, LibraryEntry } from './types';
import mapper from './mapper';

export * from './types';
export { mapper };

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
        
        return xmlToJs(response.data);
    } catch(e) {
        console.error('Error', e);
    }
}

export async function getLibrary(): Promise<LibraryEntry[]> {
    const [animeList, mangaList] = await Promise.all([getUserList('anime'), getUserList('manga')]);
    return [
        ...animeList,
        ...mangaList
    ];
}

async function getUserList(type: SeriesType): Promise<LibraryEntry[]> {
    try {
        const response = await axios.get(`https://myanimelist.net/malappinfo.php?u=${env.MAL_USERNAME}&status=all&type=${type}`);

        const { myanimelist: { [type]: results }} = await xmlToJs(response.data) as any;
        return results;
    } catch(e) {
        console.error('Error getting MyAnimeList user list', e);
        return [];
    }
}

function xmlToJs(xml: string) {
    const parser = new xml2js.Parser({explicitArray: false});
    const parse = promisify(parser.parseString);
    return parse(xml);
}