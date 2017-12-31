import {CommonStatusEntry, ListEntryMapper} from '../common';
import {MediaList, MediaListStatus} from './types';

class AniListMapper implements ListEntryMapper<MediaList> {
    exportToCommon(entry: MediaList, common?: CommonStatusEntry): CommonStatusEntry {
        const commonProposal: CommonStatusEntry = {
            type: entry.media.type,
            status: this.getStatus(entry.status),
            score: this.getScore(entry.score),
            progress: entry.progress,
            progressVolumes: entry.progressVolumes,
            repeat: entry.repeat,
            anilistId: entry.media.id,
            malId: entry.media.idMal,
            services: {
                anilist: entry
            }
        };

        if (commonProposal.malId === undefined || commonProposal.malId === 0) {
            console.error('NO MAL data for ', entry.media.title.english);
        }

        return Object.assign({}, common, commonProposal);
    }

    getScore(aniListScore: number): number {
        return Math.round(aniListScore);
    }

    getStatus(aniListStatus: MediaListStatus): MediaListStatus {
        return aniListStatus;
    }
}

export default new AniListMapper();