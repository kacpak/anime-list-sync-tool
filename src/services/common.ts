import {MediaList, MediaListStatus, MediaType} from './AniList/types';
import {LibraryEntry} from './MyAnimeList/types';

export type CommonType = MediaType;
export type CommonStatus = MediaListStatus;

export interface CommonStatusEntry {
    type: CommonType;
    status: CommonStatus;
    score: number; // As in MAL so simple mapper will work
    progress: number;
    progressVolumes: number;
    repeat: number;
    aniListId: number|undefined;
    myAnimeListId: number|undefined;
    services: {
        aniList?: MediaList,
        myAnimeList?: LibraryEntry
    }
}

export interface ListEntryMapper<T> {
    exportToCommon(entry: T, common?: CommonStatusEntry): CommonStatusEntry;
    getScore(nativeScore: any): number;
    getStatus(nativeStatus: any): CommonStatus;
}

export interface ServiceChanges {
    aniList: Change[];
    myAnimeList: Change[]
}

export interface Change {
    type: 'CREATE'|'UPDATE'|'DELETE';
    data: ChangeData|any;
}

export interface ChangeData {
    id: number|undefined;
    type: CommonType;
    status?: CommonStatus;
    score?: number;
    progress?: number;
    progressVolumes?: number;
    repeat?: number;
}