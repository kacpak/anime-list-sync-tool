import {listAnime, listManga} from '../services/anilist';

export async function getAniListLibraryData() {
    console.log('Getting AniList library data');
    try {
        const animeLists = await listAnime();
        const mangaLists = await listManga();

        const mapEntry = type => entry => ({
            anilist_id: entry.series_id,
            title_romaji: entry[type].title_romaji,
            title_english: entry[type].title_english,
            title_japanese: entry[type].title_japanese,
            type,
            anilist_data: entry
        });
        const mapAnimeEntry = mapEntry('anime');
        const mapMangaEntry = mapEntry('manga');

        const library = [
            ...animeLists.completed.map(mapAnimeEntry),
            ...animeLists.dropped.map(mapAnimeEntry),
            ...animeLists.on_hold.map(mapAnimeEntry),
            ...animeLists.plan_to_watch.map(mapAnimeEntry),
            ...animeLists.watching.map(mapAnimeEntry),
            ...mangaLists.completed.map(mapMangaEntry),
            ...mangaLists.dropped.map(mapMangaEntry),
            ...mangaLists.on_hold.map(mapMangaEntry),
            ...mangaLists.plan_to_read.map(mapMangaEntry),
            ...mangaLists.reading.map(mapMangaEntry)
        ];
        
        return library;
    } catch (e) {        
        console.error('There was a problem during library creation', e.message);
        console.dir(e);
    }
}

export default async function updateLibrary() {
    // 1. Get AniList Library
    const aniListLibrary = await getAniListLibraryData();
    console.log(aniListLibrary);

    // 2. Update data store [later -> get all ids that aren't in aniListLibrary and remove them from data store]

    // 3. Get entries without mal_id

    // 4. Fetch those entries

    // 5. Update data store with mal_data & mal_id

    // 6. Fetch whole data store

    // 7. Merge data from both anilist and mal in memory

    // 8. Update mal and anilist when necessary
}