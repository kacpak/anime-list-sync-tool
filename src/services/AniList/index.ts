import {MediaList, MediaLists, MediaType, User} from './types';
import {getUser} from './user';
import {graphql} from './request';
import mapper from './mapper';

export * from './types';
export {mapper};

export async function getLibrary(): Promise<MediaList[]> {
    await getUser(); // to prefetch user, so no 2 express instances for access_token will be generated during list fetch
    const [animeLists, mangaLists] = await Promise.all([
        getMediaStatusList('ANIME'),
        getMediaStatusList('MANGA')
    ]);

    return [
        ...(animeLists.completed || []),
        ...(animeLists.current || []),
        ...(animeLists.dropped || []),
        ...(animeLists.paused || []),
        ...(animeLists.planning || []),
        ...(mangaLists.completed || []),
        ...(mangaLists.current || []),
        ...(mangaLists.dropped || []),
        ...(mangaLists.paused || []),
        ...(mangaLists.planning || [])
    ];
}

async function getMediaStatusList(type: MediaType): Promise<MediaLists> {
    try {
        const { id } = await getUser() as User;
        const mediaCollection = await graphql(`
        query ($id: Int) {
            MediaListCollection (userId: $id, type: ${type}) {
                statusLists {
                    id
                    mediaId
                    status
                    score
                    progress
                    progressVolumes
                    repeat
                    notes
                    startedAt {
                      year
                      month
                      day
                    }
                    updatedAt
                    media {
                        id
                        idMal
                        type
                        title {
                          romaji
                          english
                          native
                          userPreferred
                        }
                      }
                }
            }
        }
        `, {
            id
        });

        return mediaCollection.MediaListCollection.statusLists

    } catch (e) {
        console.error(e.response);
        return {} as MediaLists;
    }
}

export async function getAniListIdFromMalId(myAnimeListId: number): Promise<number|undefined> {
    try {
        const media = await graphql(`
        query ($myAnimeListId: Int) {
            Media(idMal: $myAnimeListId) {
                id
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
            }
        }
        `, {
            myAnimeListId
        });

        if (media.Media) {
            return media.Media.id;
        }

    } catch (e) {
        console.error(e);
    }
}