import {baseUrl, clientConfig} from './config';
import axios from 'axios';
import db from '../../storage';

let token;

function getAuthorizationPin() {
    const url = `${baseUrl}/auth/authorize?grant_type=authorization_pin&client_id=${clientConfig.client_id}&response_type=pin`;
    console.info('You probably need to update authorization pin env variable from here:', url);
}

async function getAccessToken() {
    if (token) {
        const now = new Date().getTime() / 1000;
        const expires = token.expires;
        if (now < expires - 60) { // We have at least a minute on this token
            return token;
        }
    }

    try {
        token = await db.findOne({
            access_token: { $exists: true }
        });
        console.debug('Retrieved AniList Token from data store', token);
    } catch(e) {
        console.log(`Couldn't find access token in datastore`, e.message);
    }

    if (token) {
        token = await refreshToken(token.refresh_token);
    } else {
        token = await authorize();
    }
    return token;
}

async function refreshToken(refresh_token) {
    try {
        const response = await axios.post(
            `${baseUrl}/auth/access_token`, 
            {
                grant_type: 'refresh_token',
                client_id: clientConfig.client_id,
                client_secret: clientConfig.client_secret,
                refresh_token
            }
        );
        const token = (await db.update(
            { access_token: { $exists: true } },
            { $set: response.data },
            { returnUpdatedDocs: true }
        ))[1];
        console.debug('Refreshed AniList access token', token);
        return token;
    } catch(e) {
        console.error('Error during AniList refresh token request', e.message);
        return authorize();
    }
}

async function authorize() {
    try {
        getAuthorizationPin(); // TODO store authorization pin in data store, if it was already used process.exit() with link to get a new one, otherwise continue
        const response = await axios.post(
            `${baseUrl}/auth/access_token`, 
            {
                grant_type: 'authorization_pin',
                ...clientConfig
            }
        );
        await db.update(
            { access_token: { $exists: true } },
            response.data,
            { upsert: true, returnUpdatedDocs: true }
        );
        return response.data;
    } catch(e) {
        console.error('Error during AniList access token acquisition', e.message);
        console.dir(e);
        process.exit(1);
    }
}

export async function getAuthorizationHeader() {
    const token = await getAccessToken();
    return `${token.token_type} ${token.access_token}`;
}