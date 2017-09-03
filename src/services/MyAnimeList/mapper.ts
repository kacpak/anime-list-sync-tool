import {CommonAnimeEntry, CommonMangaEntry, AnimeStatus, MangaStatus} from '../common';
import {AnimeEntryStatus, LibraryEntry} from './types';

function mapStatusToCommon(status: AnimeEntryStatus): AnimeStatus {
    switch(status) {
        case '1': return 'watching';
        case '2': return 'completed';
        case '3': return 'on-hold';
        case '4': return 'dropped';
        case '6': return 'plan-to-watch';
    }
}

function mapDateToCommon(date: string): string|undefined {
    if (date !== '0000-00-00') {
        return date;
    }
}

export function getCommonAnimeEntry(animeEntry: LibraryEntry): CommonAnimeEntry {
    const score = parseInt(animeEntry.my_score) * 10;
    return {
        status: mapStatusToCommon(animeEntry.my_status),
        score,
        started: mapDateToCommon(animeEntry.my_start_date),
        finished: mapDateToCommon(animeEntry.my_finish_date),
        watchedEpisodes: parseInt(animeEntry.my_watched_episodes),
        // rewatching: malEntry.my_rewatching !== '0',
        // rewatchedEpisodes: parseInt(malEntry.my_rewatching_ep)
    };
}

export function isCommonAnimeEntryEqual(commonEntry: CommonAnimeEntry, entry: LibraryEntry): boolean {
    // MAL uses 0-10 score, so it needs to be taken care in conversion (83 == 80)
    const mappedEntry = getCommonAnimeEntry(entry);
    return mappedEntry.status === commonEntry.status
        && mappedEntry.score === commonEntry.score
        && mappedEntry.started === commonEntry.started
        && mappedEntry.finished === commonEntry.finished
        && mappedEntry.watchedEpisodes === commonEntry.watchedEpisodes
}