export interface LibraryEntry {
    added_time: string;
    // advanced_rating_scores;
    anime?: AnimeSeries;
    manga?: MangaSeries;
    chapters_read: number;
    // custom_lists;
    episodes_watched: number;
    finished_on: string|null;
    hidden_default: 0|1;
    list_status: AnimeEntryStatus|MangaEntryStatus;
    // notes;
    // priority;
    // private;
    record_id: number;
    reread: number;
    rewatched: number;
    score: number|':('|':|'|':)';
    score_raw: number; // 0-100
    series_id: number;
    started_on: string|null;
    updated_time: string;
    volumes_read: number;
}

export interface Series {
    id: number;
    series_type: 'anime'|'manga';
    title_english: string;
    title_japanese: string;
    title_romaji: string;
    type: MediaType;
    start_date?: string|null;
    end_date?: string|null;
    start_date_fuzzy: number|null;
    end_date_fuzzy: number|null;
    season?: number|null;
    description?: string|null;
    synonyms: string[];
    genres: string[];
    adult: boolean;
    average_score: number;
    popularity: number;
    favourite?: boolean;
    image_url_sml: string;
    image_url_med: string;
    image_url_lge: string;
    image_url_banner?: string;
    updated_at: number;
    score_distribution?: {[key: string]: number};
    list_stats?: {[key: string]: number};
}

export interface AnimeSeries extends Series {
    total_episodes: number;
    duration?: number|null;
    airing_status: AnimeStatus|null;
    youtube_id?: string|null;
    hashtag?: string|null;
    source?: string|null;
    airing_stats?: any[];
}

export interface MangaSeries extends Series {
    total_chapters: number;
    total_volumes?: number;
    publishing_status: MangaStatus|null;
}

export type MediaType = 'TV'|'TV Short'|'Movie'|'Special'|'OVA'|'ONA'|'Music'|'Manga'|'Novel'|'One Shot'|'Doujin'|'Manhua'|'Manhwa';

export type AnimeStatus = 'finished airing'|'currently airing'|'not yet aired'|'cancelled';

export type MangaStatus = 'finished publishing'|'publishing'|'not yet published'|'cancelled';

export type AnimeSource = 'Original'|'Manga'|'Light Novel'|'Visual Novel'|'Video Game'|'Other';

export type AnimeEntryStatus = 'watching'|'completed'|'on-hold'|'dropped'|'plan to watch';

export type MangaEntryStatus = 'reading'|'completed'|'on-hold'|'dropped'|'plan to read';