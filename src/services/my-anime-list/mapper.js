import {ANIME_STATUS} from '../libraryEntry';

function mapStatusToCommon(status) {
    switch(status) {
        case '1': return ANIME_STATUS.watching;
        case '2': return ANIME_STATUS.completed;
        case '3': return ANIME_STATUS.onHold;
        case '4': return ANIME_STATUS.dropped;
        case '6': return ANIME_STATUS.planToWatch;
    }
}

function mapDateToCommon(date) {
    if (date !== '0000-00-00') {
        return date;
    }
}

export function mapEntryToCommon(malEntry) {
    const status = mapStatusToCommon(malEntry.my_status);

    return {
        status,
        score: malEntry.my_score,
        started: mapDateToCommon(malEntry.my_start_date),
        finished: mapDateToCommon(malEntry.my_finish_date),
        watchedEpisodes: parseInt(malEntry.my_watched_episodes),
        // rewatching: malEntry.my_rewatching !== '0',
        // rewatchedEpisodes: parseInt(malEntry.my_rewatching_ep)
    };
}