import {User} from './types';
import {graphql} from './request';

let user: User;
export async function getUser(): Promise<User|undefined> {
    if (!user) {
        try {
            const viewer = await graphql(`
            query {
                Viewer {
                    id, name
                }
            }
            `);
            user = viewer.Viewer;

        } catch (e) {
            console.error(e);
        }
    }

    return user;
}