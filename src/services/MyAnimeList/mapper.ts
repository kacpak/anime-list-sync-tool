import {CommonStatusEntry, ListEntryMapper} from '../common';
import {AnimeLibraryEntry, LibraryEntry, MangaLibraryEntry} from './types';
import {MediaListStatus} from "../AniList/types";

class MyAnimeListMapper implements ListEntryMapper<LibraryEntry> {
    exportToCommon(entry: LibraryEntry, common?: CommonStatusEntry): CommonStatusEntry {
        const commonProposal: Partial<CommonStatusEntry> = {
            status: this.getStatus(entry.my_status),
            score: this.getScore(entry.my_score),
            services: {
                mal: entry
            }
        };

        if (entry['series_animedb_id']) {
            const animeEntry = entry as AnimeLibraryEntry;
            commonProposal.type = 'ANIME';
            commonProposal.malId = parseInt(animeEntry.series_animedb_id || '');
            commonProposal.progress = parseInt(animeEntry.my_watched_episodes);
            commonProposal.repeat = parseInt(animeEntry.my_rewatching);
        } else {
            const mangaEntry = entry as MangaLibraryEntry;
            commonProposal.type = 'MANGA';
            commonProposal.malId = parseInt(mangaEntry.series_mangadb_id || '');
            commonProposal.progress = parseInt(mangaEntry.my_read_chapters);
            commonProposal.progressVolumes = parseInt(mangaEntry.my_read_volumes);
            commonProposal.repeat = parseInt(mangaEntry.my_rereadingg);
        }

        return Object.assign({}, common, commonProposal) as CommonStatusEntry;
    }

    getScore(malScore: string): number {
        return parseInt(malScore);
    }

    getStatus(malStatus: string): MediaListStatus {
        switch(malStatus) {
            case '1': return 'CURRENT';
            case '2': return 'COMPLETED';
            case '3': return 'PAUSED';
            case '4': return 'DROPPED';
            case '6': return 'PLANNING';
            default: return 'PLANNING';
        }
    }
}

export default new MyAnimeListMapper();