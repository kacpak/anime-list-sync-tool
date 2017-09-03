import {CommonAnimeEntry, CommonMangaEntry, AnimeStatus, MangaStatus} from '../common';
import {AnimeEntryStatus, MangaEntryStatus, LibraryEntry} from './types';

function mapStatusToCommon(status: AnimeEntryStatus): AnimeStatus {
    switch(status) {
        case 'watching': return 'watching';
        case 'completed': return 'completed';
        case 'on-hold': return 'on-hold';
        case 'dropped': return 'dropped';
        case 'plan to watch': return 'plan-to-watch';
    }
}

function mapDateToCommon(date: string|null): string|undefined {
    if (date) {
        return date.slice(0, 8);
    }
}

export function getCommonAnimeEntry(aniListEntry: LibraryEntry): CommonAnimeEntry {
    return {
        status: mapStatusToCommon(aniListEntry.list_status as AnimeEntryStatus),
        score: aniListEntry.score_raw,
        started: mapDateToCommon(aniListEntry.started_on),
        finished: mapDateToCommon(aniListEntry.finished_on),
        watchedEpisodes: aniListEntry.episodes_watched
    }
}

export function isCommonAnimeEntryEqual(commonEntry: CommonAnimeEntry, entry: LibraryEntry) {
    const mappedAniListEntry = getCommonAnimeEntry(entry);
    return mappedAniListEntry.status === commonEntry.status
        && mappedAniListEntry.score === commonEntry.score
        && mappedAniListEntry.started === commonEntry.started
        && mappedAniListEntry.finished === commonEntry.finished
        && mappedAniListEntry.watchedEpisodes === commonEntry.watchedEpisodes
}