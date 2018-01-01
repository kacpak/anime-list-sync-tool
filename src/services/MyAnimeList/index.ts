import axios from 'axios';
import { promisify } from 'util';
import * as xml2js from 'xml2js';
import env from '../../util/env';
import { SeriesType, LibraryEntry } from './types';
import mapper from './mapper';
import {ChangeData, CommonStatus} from '../common';
import * as querystring from 'querystring';

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

export async function addToLibrary(change: ChangeData) {
    try {
        const response = await axios.post(
            `https://myanimelist.net/api/${change.type.toLowerCase()}list/add/${change.id}.xml`,
            querystring.stringify({
                data: changeToXml(change)
            }),
            {
                auth: {
                    username: env.MAL_USERNAME,
                    password: env.MAL_PASSWORD
                },
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.status === 201;

    } catch (e) {
        console.error(e);
    }
}

export async function updateInLibrary(change: ChangeData) {
    try {
        const response = await axios.post(
            `https://myanimelist.net/api/${change.type.toLowerCase()}list/update/${change.id}.xml`,
            querystring.stringify({
                data: changeToXml(change)
            }),
            {
                auth: {
                    username: env.MAL_USERNAME,
                    password: env.MAL_PASSWORD
                },
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.status === 201;

    } catch (e) {
        console.error(e);
    }
}

function changeToXml(change: ChangeData) {
    if (change.type === 'ANIME') {
        return jsToXml({
            entry: {
                episode: change.progress,
                status: mapper.getNativeStatus(change.status as CommonStatus),
                score: change.score
            }
        });
    } else {
        return jsToXml({
            entry: {
                chapter: change.progress,
                volume: change.progressVolumes,
                status: mapper.getNativeStatus(change.status as CommonStatus),
                score: change.score
            }
        });
    }
}

async function xmlToJs(xml: string) {
    const parser = new xml2js.Parser({explicitArray: false});
    const parse = promisify(parser.parseString);
    return parse(xml);
}

function jsToXml(obj: any) {
    const builder = new xml2js.Builder({renderOpts: {pretty: false}});
    return builder.buildObject(obj);
}