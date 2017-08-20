import axios from 'axios';
import parser from 'xml2json';

export async function searchAnime(query) {
    return search('anime', query);
}

export async function searchManga(query) {
    return search('manga', query);
}

export async function search(type, query) {
    try {
        const response = await axios.get(`https://myanimelist.net/api/${type}/search.xml`, {
            auth: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
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