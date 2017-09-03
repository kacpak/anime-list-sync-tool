import {listAnime, listManga} from '../services/AniList';
import {search, getUserList} from '../services/MyAnimeList';
import db from '../storage';

async function getAniListLibraryData() {
    try {
        const animeLists = await listAnime();
        const mangaLists = await listManga();

        // AniList returns lists object with keys of statuses and values of entries arrays, this flattens this object to single arrays
        const animeList = [].concat.apply([], Object.values(animeLists));
        const mangaList = [].concat.apply([], Object.values(mangaLists));

        const mapEntry = type => entry => ({
            anilist_id: entry.series_id,
            title_romaji: entry[type].title_romaji,
            title_english: entry[type].title_english,
            title_japanese: entry[type].title_japanese,
            anilist_data: entry,
            type
        });

        const library = [
            ...animeList.map(mapEntry('anime')),
            ...mangaList.map(mapEntry('manga'))
        ];

        return library;
    } catch (e) {
        console.error('There was a problem during AniList library creation', e.message);
        console.dir(e);
        process.exit(2);
    }
}

async function getMyAnimeListLibraryData() {
    try {
        const animeList = await getUserList('anime');
        const mangaList = await getUserList('manga');

        const mapEntry = type => entry => ({
            mal_id: parseInt(entry[`series_${type}db_id`]),
            mal_data: entry,
            type
        });

        const library = [
            ...animeList.map(mapEntry('anime')),
            ...mangaList.map(mapEntry('manga'))
        ];

        return library;
    } catch (e) {
        console.error('There was a problem during MyAnimeList library creation', e.message);
        console.dir(e);
        process.exit(3);
    }
}

async function updateDataStore(library) {
    const updates = library.map(async entry => (await db.update(
        { anilist_id: entry.anilist_id },
        { $set: entry },
        { upsert: true, returnUpdatedDocs: true }
    ))[1]);
    return Promise.all(updates);
}

async function findMalEntry(entry) {
    const { [entry.type]: { entry: results } } = await search(entry.type, entry.title_english);
    const possibleResults = results.filter(malEntry => parseInt(malEntry.start_date.replace(/-/g, '')) == entry.anilist_data[entry.type].start_date_fuzzy);
    // TODO make it move foolproof - check synonyms etc.

    if (possibleResults.length === 0) {
        return entry;
    }

    const mal_entry = possibleResults[0];
    return {
        ...entry,
        mal_id: parseInt(mal_entry.id)
    }
}

export default async function updateLibrary() {
    // 1. Get libraries
    console.log('Getting AniList library data...');
    let library = await getAniListLibraryData();

    console.log('Getting MyAnimeList library data...');
    let malLibrary = await getMyAnimeListLibraryData();

    // 2. Update data store with refreshed anilist
    console.log('Updating data store with AniList library...');
    library = await updateDataStore(library);

    // 3. Update library entries with mal_id with malLibrary data (and remove them from malLibrary to track merging progress)

    // 4. Get entries without mal_id and search for them and concat malLibrary entries not resolved earlier
    console.log('Finding entries not connected with MyAnimeList...')
    const incompleteEntries = await Promise.all(
        library
            .filter(entry => !entry.mal_id)
            .map(findMalEntry)
    );
    console.log(incompleteEntries);

    // 5. For every incomplete entry
    //      if missing mal_id
    //          try to match id from remaining malLibrary
    //          search for id based on AniList data
    //      if missing anilist_id
    //          search for id based on MyAnimeList data

    // 6. Save ids of library and incompleteEntries to clean database later

    // 7. Update store with library and incomplete entries (use update results as new in-memory library)

    // 8. For every entry merge `watch data` and decide if either AniList or/and MyAnimeList needs to be updated.
    //    For those missing watch data add them
    //    ATTENTION! There is no mechanism to sync deleting entries - it needs to be done manually on both sides
}