import axios from 'axios';
import {getAccessToken} from './auth';

export async function graphql(query = '', variables = {}) {
    return axios.post(
        'https://graphql.anilist.co',
        {
            query,
            variables
        },
        {
            headers: {
                Authorization: 'Bearer ' + (await getAccessToken()).access_token,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then(response => response.data.data);
}