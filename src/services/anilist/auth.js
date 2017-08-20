import {baseUrl, clientConfig} from './config';
import axios from 'axios';
import db from '../../storage';

let token;

function getAuthorizationPin() {
    const url = `${baseUrl}/auth/authorize?grant_type=authorization_pin&client_id=${config.client_id}&response_type=pin`;
    console.log('You probably need to update authorization pin env variable from here:', url);
}

async function getAccessToken() {
    if (token) {
        return token;
    }

    try {
        token = await db.findOne({
            access_token: { $exists: true }
        });
        console.info('Retrieved AniList Token', token);
        return token;
    } catch(e) {
        console.log(`Couldn't find access token in datastore`, e);
    }

    token = authorize();
    return token;
}

async function authorize() {
    try {
        getAuthorizationPin();
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
        console.error('Error during AniList access token acquisition', e);
    }
}

async function refeshToken(token) {

}

export async function getAuthorizationHeader() {
    const token = await getAccessToken();
    return `${token.token_type} ${token.access_token}`;
}

// await db.update(
//     { access_token: { $exists: true } },
//     {
//         "access_token": "I8f0S60RMOPNr5Xp8kDDXmuUrQ2ez2kQ3zf6Qhbg",
//         "token_type": "Bearer",
//         "expires_in": 3600,
//         "refresh_token": "DFT5d8kF8ahf4EovvrHAkIGJaUj9Da5yrKKUH15j",
//         "expires": 1503251785
//     },
//     { upsert: true, returnUpdatedDocs: true }
// );