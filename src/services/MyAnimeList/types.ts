export interface LibraryEntry {
    my_id: string;
    my_start_date: string;
    my_finish_date: string;
    my_last_updated: string;
    my_tags: any;
    my_score: string;
    my_status: EntryStatus;
    series_end: string;
    series_episodes: string;
    series_image: string;
    series_start: string;
    series_status: string;
    series_synonyms: string;
    series_title: string;
    series_type: string;
}

export interface AnimeLibraryEntry extends LibraryEntry {
    series_animedb_id: string;
    my_watched_episodes: string;
    my_rewatching: string;
    my_rewatching_ep: string;
}

export interface MangaLibraryEntry extends LibraryEntry {
    series_mangadb_id: string;
    my_read_chapters: string;
    my_read_volumes: string;
    my_rereadingg: string;
    my_rereading_chap: string;
}

export type EntryStatus = '1'|'2'|'3'|'4'|'6';

export type SeriesType = 'anime'|'manga';