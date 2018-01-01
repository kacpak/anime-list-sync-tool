import {CommonStatus, CommonStatusEntry, ListEntryMapper} from '../common';
import {AnimeLibraryEntry, LibraryEntry, MangaLibraryEntry} from './types';

class MyAnimeListMapper implements ListEntryMapper<LibraryEntry> {
    exportToCommon(entry: LibraryEntry, common?: CommonStatusEntry): CommonStatusEntry {
        const commonProposal: Partial<CommonStatusEntry> = {
            status: this.getCommonStatus(entry.my_status),
            score: this.getCommonScore(entry.my_score),
            services: {
                myAnimeList: entry
            }
        };

        if (entry['series_animedb_id']) {
            const animeEntry = entry as AnimeLibraryEntry;
            commonProposal.type = 'ANIME';
            commonProposal.myAnimeListId = parseInt(animeEntry.series_animedb_id || '');
            commonProposal.progress = parseInt(animeEntry.my_watched_episodes);
            commonProposal.repeat = parseInt(animeEntry.my_rewatching);
        } else {
            const mangaEntry = entry as MangaLibraryEntry;
            commonProposal.type = 'MANGA';
            commonProposal.myAnimeListId = parseInt(mangaEntry.series_mangadb_id || '');
            commonProposal.progress = parseInt(mangaEntry.my_read_chapters);
            commonProposal.progressVolumes = parseInt(mangaEntry.my_read_volumes);
            commonProposal.repeat = parseInt(mangaEntry.my_rereadingg);
        }

        return Object.assign({}, common, commonProposal) as CommonStatusEntry;
    }

    getCommonScore(malScore: string): number {
        return parseInt(malScore);
    }

    getCommonStatus(malStatus: string): CommonStatus {
        switch(malStatus) {
            case '1': return 'CURRENT';
            case '2': return 'COMPLETED';
            case '3': return 'PAUSED';
            case '4': return 'DROPPED';
            case '6': return 'PLANNING';
            default: return 'PLANNING';
        }
    }

    getNativeStatus(commonStatus: CommonStatus): string {
        switch(commonStatus) {
            case 'CURRENT': return '1';
            case 'COMPLETED': return '2';
            case 'PAUSED': return '3';
            case 'DROPPED': return '4';
            case 'PLANNING': return '6';
            case 'REPEATING': return '2';
        }
    }
}

export default new MyAnimeListMapper();