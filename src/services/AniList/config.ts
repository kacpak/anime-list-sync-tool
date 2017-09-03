import env from '../../util/env';

export const baseUrl = 'https://anilist.co/api';

export const clientConfig = {
    client_id: env.ANILIST_CLIENT_ID,
    client_secret: env.ANILIST_CLIENT_SECRET,
    code: env.ANILIST_AUTHORIZATION_PIN
};