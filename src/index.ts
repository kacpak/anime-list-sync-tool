import * as anilist from './services/AniList';
import * as mal from './services/MyAnimeList';
import {CommonStatusEntry, EntryDifferences} from './services/common';

async function getAniListLibrary() {
    const mediaList: CommonStatusEntry[] = [];
    const aniListEntries = await anilist.getLibrary();

    for (let entry of aniListEntries) {
        mediaList.push(anilist.mapper.exportToCommon(entry));
    }

    return mediaList;
}

async function updateLibraryWithMal(commonLibrary: CommonStatusEntry[]) {
    const malEntries = await mal.getLibrary();

    for (let entry of malEntries) {
        const malId = entry['series_animedb_id'] || entry['series_mangadb_id'];
        const commonLibraryEntry = commonLibrary.find(common => common.malId === parseInt(malId || ''));

        if (commonLibraryEntry) {
            commonLibraryEntry.services.mal = entry;
        } else {
            commonLibrary.push(mal.mapper.exportToCommon(entry));
        }
    }
}

function findDifferences(commonLibrary: CommonStatusEntry[]) {
    const aniListOnly: CommonStatusEntry[] = [];
    const malOnly: CommonStatusEntry[] = [];
    const differences: EntryDifferences[] = [];

    for (let entry of commonLibrary) {
        if (entry.services.mal && !entry.services.anilist) {
            malOnly.push(entry);
        } else if (!entry.services.mal && entry.services.anilist) {
            aniListOnly.push(entry);
        } else if (entry.services.mal && entry.services.anilist) { // ahh TypeScript....
            const diff: Partial<EntryDifferences> = {};

            let malAnime: mal.AnimeLibraryEntry|undefined = undefined,
                malManga: mal.MangaLibraryEntry|undefined = undefined;

            if (entry.services.mal['series_animedb_id']) {
                malAnime = entry.services.mal as mal.AnimeLibraryEntry;
            } else {
                malManga = entry.services.mal as mal.MangaLibraryEntry;
            }

            const malScore = mal.mapper.getScore(entry.services.mal.my_score);
            const aniListScore = anilist.mapper.getScore(entry.services.anilist.score);
            if (malScore != aniListScore) {
                diff.score = {
                    mal: malScore,
                    anilist: aniListScore
                }
            }

            const malStatus = mal.mapper.getStatus(entry.services.mal.my_status);
            const aniListStatus = anilist.mapper.getStatus(entry.services.anilist.status);
            if (malStatus != aniListStatus) {
                diff.status = {
                    mal: malStatus,
                    anilist: aniListStatus
                }
            }

            const malProgress = parseInt(malAnime ? malAnime.my_watched_episodes : malManga ? malManga.my_read_chapters : '');
            const aniListProgress = entry.services.anilist.progress;
            if (malProgress != aniListProgress) {
                diff.progress = {
                    mal: malProgress,
                    anilist: aniListProgress
                }
            }

            if (Object.keys(diff).length) {
                diff.malId = entry.malId as number;
                diff.aniId = entry.anilistId as number;
                diff.title = entry.services.anilist.media.title.userPreferred;
                differences.push(diff as  EntryDifferences);
            }
        } else {
            console.error('MAGIC - exists in no service', entry);
        }
    }

    console.log('Total', commonLibrary.length);
    console.log('Only in MAL', malOnly.length);
    console.log('Only in AniList', aniListOnly.length);
    console.log('With differences', differences.length);
    console.log();
    console.log();
    console.log('# MyAnimeList only');
    malOnly.forEach(entry => console.log('\t', entry.services.mal && entry.services.mal.series_title));
    console.log();
    console.log();
    console.log('# AniList only');
    aniListOnly.forEach(entry => console.log('\t', entry.services.anilist && entry.services.anilist.media.title.userPreferred));
    console.log();
    console.log();
    console.log('# Differences');
    differences.forEach(diff => {
        console.log('\t', diff.title);
        if (diff.score)
            console.log('\t', 'score', 'MAL', diff.score.mal, 'ANI', diff.score.anilist);
        if (diff.status)
            console.log('\t', 'status', 'MAL', diff.status.mal, 'ANI', diff.status.anilist);
        if (diff.progress)
            console.log('\t', 'progress', 'MAL', diff.progress.mal, 'ANI', diff.progress.anilist);
        console.log();
    });
}

(async function run() {
    const mediaList = await getAniListLibrary();
    await updateLibraryWithMal(mediaList);
    findDifferences(mediaList);
})()
    .catch(console.error);