import * as opn from 'opn';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { URLSearchParams } from 'url';
import env from '../../util/env';

export interface Token {
    access_token: string;
    token_type: string;
    expires_in: string;
}

async function fetchAccessToken(): Promise<Token> {
    const query = {
        client_id: env.ANILIST_CLIENT_ID,
        response_type: 'token'
    };
    const url = `https://anilist.co/api/v2/oauth/authorize?${new URLSearchParams(query).toString()}`;
    opn(url);

    return new Promise<Token>(resolve => {
        const app = express();
        const server = app.listen(8666);
        app.use(bodyParser.json());
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'redirect.html'));
        });
        app.post('/token', (req, res) => {
            const tokenData: Token = req.body;
            res.sendStatus(200);
            server.close();
            resolve(tokenData);
        });
    });
}

let token: Token;
export async function getAccessToken(): Promise<Token> {
    if (!token) {
        token = await fetchAccessToken();
    }
    return token;
}