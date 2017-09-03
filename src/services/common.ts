export type AnimeStatus = 'watching'|'completed'|'on-hold'|'dropped'|'plan-to-watch';

export type MangaStatus = 'reading'|'completed'|'on-hold'|'dropped'|'plan-to-read';

export interface CommonLibraryEntry {
    started: string|undefined;
    finished: string|undefined;
    score: number; // 0-100
}

export interface CommonAnimeEntry extends CommonLibraryEntry {
    status: AnimeStatus;
    watchedEpisodes: number;
}

export interface CommonMangaEntry extends CommonLibraryEntry {
    status: MangaStatus;
    readChapters: number;
    readVolumes: number|undefined;
}