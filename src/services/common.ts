import {MediaList, MediaListStatus, MediaType} from './AniList/types';
import {LibraryEntry} from './MyAnimeList/types';

export interface CommonStatusEntry {
    type: MediaType;
    status: MediaListStatus;
    score: number; // As in MAL so simple mapper will work
    progress: number;
    progressVolumes: number;
    repeat: number;
    anilistId: number|undefined;
    malId: number|undefined;
    services: {
        anilist?: MediaList,
        mal?: LibraryEntry
    }
}

export interface ListEntryMapper<T> {
    exportToCommon(entry: T, common?: CommonStatusEntry): CommonStatusEntry;
    getScore(nativeScore: any): number;
    getStatus(nativeStatus: any): MediaListStatus;
}

export interface Difference {
    mal: any;
    anilist: any;
}

export interface EntryDifferences {
    aniId: number;
    malId: number;
    title: string;
    score?: Difference;
    status?: Difference;
    progress?: Difference;
}