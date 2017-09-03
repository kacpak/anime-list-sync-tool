export interface LibraryEntry {
    my_finish_date: string;
    my_id: string;
    my_last_updated: string;
    my_rewatching: string;
    my_rewatching_ep: string;
    my_score: string;
    my_start_date: string;
    my_status: EntryStatus;
    my_tags: any;
    my_watched_episodes: string;
    series_animedb_id: string;
    series_end: string;
    series_episodes: string;
    series_image: string;
    series_start: string;
    series_status: string;
    series_synonyms: string;
    series_title: string;
    series_type: string;
}

type EntryStatus = '1'|'2'|'3'|'4'|'6';
export type AnimeEntryStatus = EntryStatus;
export type MangaEntryStatus = EntryStatus;