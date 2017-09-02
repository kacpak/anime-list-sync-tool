import {ANIME_STATUS} from '../libraryEntry';

function mapStatusToCommon(status) {
    switch(status) {
        case "watching": return ANIME_STATUS.watching;
        case "completed": return ANIME_STATUS.completed;
        case "on-hold": return ANIME_STATUS.onHold;
        case "dropped": return ANIME_STATUS.dropped;
        case "plan to watch": return ANIME_STATUS.planToWatch;
    }
}

function mapDateToCommon(date) {
    if (date) {
        return date.slice(0, 8);
    }
}

export function mapEntryToCommon(aniListEntry) {
    return {
        status: mapStatusToCommon(aniListEntry.list_status),
        score: `${aniListEntry.score}`,
        started: mapDateToCommon(aniListEntry.started_on),
        finished: mapDateToCommon(aniListEntry.finished_on),
        watchedEpisodes: aniListEntry.episodes_watched
    }
}

export function isCommonEqualToEntry(commonEntry, aniListEntry) {
}