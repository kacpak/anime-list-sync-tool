import {CommonStatus, CommonStatusEntry, ListEntryMapper} from '../common';
import {MediaList, MediaListStatus} from './types';

class AniListMapper implements ListEntryMapper<MediaList> {
    exportToCommon(entry: MediaList, common?: CommonStatusEntry): CommonStatusEntry {
        const commonProposal: CommonStatusEntry = {
            type: entry.media.type,
            status: this.getCommonStatus(entry.status),
            score: this.getCommonScore(entry.score),
            progress: entry.progress,
            progressVolumes: entry.progressVolumes,
            repeat: entry.repeat,
            aniListId: entry.media.id,
            myAnimeListId: entry.media.idMal,
            services: {
                aniList: entry
            }
        };

        if (!commonProposal.myAnimeListId) {
            console.error('No MyAnimeList id found for', entry.media.title.userPreferred);
        }

        return Object.assign({}, common, commonProposal);
    }

    getCommonScore(aniListScore: number): number {
        return Math.round(aniListScore);
    }

    getCommonStatus(aniListStatus: MediaListStatus): CommonStatus {
        return aniListStatus;
    }

    getNativeStatus(commonStatus: CommonStatus): MediaListStatus {
        return commonStatus;
    }
}

export default new AniListMapper();