import axios from 'axios';
import {baseUrl} from './config';
import {getAuthorizationHeader} from './auth';

let user;

export default async function getUser() {
    if (user) {
        return user;
    }

    try {
        const response = await axios.get(`${baseUrl}/user`, {
            headers: {
                Authorization: await getAuthorizationHeader()
            }
        });
        return response.data;
    } catch(e) {
        console.error('There was a problem during current user fetch', e.message);
        console.dir(e);
    }
}