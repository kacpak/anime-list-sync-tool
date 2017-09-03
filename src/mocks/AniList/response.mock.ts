import {LibraryEntry, AnimeSeries} from '../../services/AniList/types';

const cowboyAnimeSeries: AnimeSeries = {
    adult: false,
    airing_status: "finished airing",
    average_score: 86.4,
    end_date_fuzzy: 19990424,
    genres: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi"],
    hashtag: null,
    id: 1,
    image_url_banner: "https://cdn.anilist.co/img/dir/anime/banner/1.jpg",
    image_url_lge: "https://cdn.anilist.co/img/dir/anime/reg/1.jpg",
    image_url_med: "https://cdn.anilist.co/img/dir/anime/med/1.jpg",
    image_url_sml: "https://cdn.anilist.co/img/dir/anime/sml/1.jpg",
    popularity: 14299,
    season: null,
    series_type: "anime",
    start_date_fuzzy: 19980403,
    synonyms: [],
    title_english: "Cowboy Bebop",
    title_japanese: "カウボーイビバップ",
    title_romaji: "Cowboy Bebop",
    total_episodes: 26,
    type: "TV",
    updated_at: 1504370997
};

export const cowboyPlanToWatchEntry: LibraryEntry = {
    added_time: "2017-09-03T06:41:22+09:00",
    anime: cowboyAnimeSeries,
    chapters_read: 0,
    episodes_watched: 0,
    finished_on: null,
    hidden_default: 0,
    list_status: "plan to watch",
    record_id: 17598919,
    reread: 0,
    rewatched: 0,
    score: 0,
    score_raw: 0,
    series_id: 1,
    started_on: null,
    updated_time: "2017-09-03T06:41:22+09:00",
    volumes_read: 0
};