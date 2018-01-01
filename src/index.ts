import * as aniList from './services/AniList';
import * as myAnimeList from './services/MyAnimeList';
import { Change, ChangeData, CommonStatusEntry, ServiceChanges } from './services/common';

async function getAniListLibrary() {
    const mediaList: CommonStatusEntry[] = [];
    const aniListEntries = await aniList.getLibrary();

    for (let entry of aniListEntries) {
        mediaList.push(aniList.mapper.exportToCommon(entry));
    }

    return mediaList;
}

async function updateLibraryWithMal(commonLibrary: CommonStatusEntry[]) {
    const malEntries = await myAnimeList.getLibrary();

    for (let entry of malEntries) {
        const malId = entry['series_animedb_id'] || entry['series_mangadb_id'];
        const commonLibraryEntry = commonLibrary.find(common => common.myAnimeListId === parseInt(malId || ''));

        if (commonLibraryEntry) {
            commonLibraryEntry.services.myAnimeList = entry;
        } else {
            commonLibrary.push(myAnimeList.mapper.exportToCommon(entry));
        }
    }
}

async function findDifferences(commonLibrary: CommonStatusEntry[]) {
    const changes: ServiceChanges = {
        aniList: [],
        myAnimeList: []
    };

    for (let entry of commonLibrary) {
        if (entry.services.myAnimeList && !entry.services.aniList) {
            // TODO right now AniList sometimes returns wrong titles judging from malId - for now import through site
            // const aniListId = await aniList.getAniListIdFromMalId(entry.myAnimeListId as number);
            // if (aniListId) {
            //     changes.aniList.push({
            //         type: 'CREATE',
            //         data: {
            //             id: aniListId,
            //             ...entry
            //         }
            //     });
            // }

        } else if (!entry.services.myAnimeList && entry.services.aniList) {
            if (entry.myAnimeListId) { // if not defined it probably does not exist in mal db (eg webtoon)
                changes.myAnimeList.push({
                    type: 'CREATE',
                    data: {
                        id: entry.myAnimeListId,
                        ...entry
                    }
                });
            }

        } else if (entry.services.myAnimeList && entry.services.aniList) { // ahh TypeScript....
            let malAnime: myAnimeList.AnimeLibraryEntry|undefined = undefined,
                malManga: myAnimeList.MangaLibraryEntry|undefined = undefined;

            if (entry.services.myAnimeList['series_animedb_id']) {
                malAnime = entry.services.myAnimeList as myAnimeList.AnimeLibraryEntry;
            } else {
                malManga = entry.services.myAnimeList as myAnimeList.MangaLibraryEntry;
            }

            const myAnimeListChange: Partial<ChangeData> = {};
            const aniListChange: Partial<ChangeData> = {};

            const malScore = myAnimeList.mapper.getScore(entry.services.myAnimeList.my_score);
            const aniListScore = aniList.mapper.getScore(entry.services.aniList.score);
            if (malScore != aniListScore) {
                if (aniListScore) {
                    myAnimeListChange.score = aniListScore;
                } else {
                    aniListChange.score = malScore;
                }
            }

            const malStatus = myAnimeList.mapper.getStatus(entry.services.myAnimeList.my_status);
            const aniListStatus = aniList.mapper.getStatus(entry.services.aniList.status);
            if (malStatus != aniListStatus) {
                myAnimeListChange.status = aniListStatus;
            }

            const malProgress = parseInt(malAnime ? malAnime.my_watched_episodes : malManga ? malManga.my_read_chapters : '');
            const aniListProgress = entry.services.aniList.progress;
            if (malProgress != aniListProgress) {
                if (aniListProgress > malProgress) {
                    myAnimeListChange.progress = aniListProgress;
                } else {
                    aniListChange.progress = malProgress;
                }
            }

            if (malManga) {
                const malProgressVolumes = parseInt(malManga.my_read_volumes);
                const aniListProgressVolumes = entry.services.aniList.progressVolumes;
                if (malProgressVolumes != aniListProgressVolumes) {
                    if (aniListProgressVolumes > malProgressVolumes) {
                        myAnimeListChange.progressVolumes = aniListProgressVolumes;
                    } else {
                        aniListChange.progressVolumes = malProgressVolumes;
                    }
                }
            }

            if (Object.keys(myAnimeListChange).length) {
                myAnimeListChange.id = entry.myAnimeListId;
                myAnimeListChange.type = entry.type;
                changes.myAnimeList.push({
                    type: 'UPDATE',
                    data: myAnimeListChange as ChangeData
                })
            }

            if (Object.keys(aniListChange).length) {
                aniListChange.id = entry.aniListId;
                aniListChange.type = entry.type;
                changes.myAnimeList.push({
                    type: 'UPDATE',
                    data: aniListChange as ChangeData
                })
            }

            // TODO add repeated check
        } else {
            console.error('MAGIC - exists in no service', entry);
        }
    }

    console.log('Total #', commonLibrary.length);
    console.log('Changes #', changes.myAnimeList.length + changes.aniList.length);
    console.log();
    const printChange = (change: Change) => {
        console.log(change.type);
        console.log('id', change.data.id, 'type', change.data.type);
        change.data.status && console.log('status', change.data.status);
        change.data.score && console.log('score', change.data.score);
        change.data.progress && console.log('progress', change.data.progress);
        change.data.progressVolumes && console.log('status', change.data.progressVolumes);
        console.log();
    };
    console.log('## Changes in MyAnimeList', changes.myAnimeList.length);
    changes.myAnimeList.forEach(printChange);
    console.log('## Changes in AniList', changes.aniList.length);
    changes.aniList.forEach(printChange);
}

(async function run() {
    const mediaList = await getAniListLibrary();
    await updateLibraryWithMal(mediaList);
    await findDifferences(mediaList);
})()
    .catch(console.error);