import {ANIME_STATUS} from '../src/services/libraryEntry';

export const aniListLibraryEntry = {
    added_time: "2017-09-03T06:41:22+09:00",
    advanced_rating_scores: [],
    anime: {
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
    },
    chapters_read: 0,
    custom_lists: null,
    episodes_watched: 0,
    finished_on: null,
    hidden_default: 0,
    list_status: "plan to watch",
    notes: null,
    priority: 0,
    private: 0,
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

export const myAnimeListLibraryEntry = {
    my_finish_date: "0000-00-00",
    my_id: "0",
    my_last_updated: "1484568280",
    my_rewatching: "0",
    my_rewatching_ep: "0",
    my_score: "0",
    my_start_date: "0000-00-00",
    my_status: "6",
    my_tags: {},
    my_watched_episodes: "0",
    series_animedb_id: "1",
    series_end: "1999-04-24",
    series_episodes: "26",
    series_image: "https://myanimelist.cdn-dena.com/images/anime/4/19644.jpg",
    series_start: "1998-04-03",
    series_status: "2",
    series_synonyms:"; Cowboy Bebop",
    series_title: "Cowboy Bebop",
    series_type: "1",
};

export const commonLibraryEntry = {
    status: ANIME_STATUS.planToWatch,
    score: '0',
    started: undefined,
    finished: undefined,
    watchedEpisodes: 0
};

export const invalidCommonLibraryEntry = {
    status: ANIME_STATUS.watching,
    score: '0',
    started: undefined,
    finished: undefined,
    watchedEpisodes: 0
}