export interface MediaLists {
    completed: MediaList[];
    planning: MediaList[];
    dropped: MediaList[];
    paused: MediaList[];
    current: MediaList[];
}

export interface MediaList {
    // The id of the list entry
    id: number;
    // The id of the user owner of the list entry
    userId: number;
    // The id of the media
    mediaId: number;
    // The watching/reading status
    status: MediaListStatus
    // The score of the entry
    score: number;
    // The amount of episodes/chapters consumed by the user
    progress: number;
    // The amount of volumes read by the user
    progressVolumes: number;
    // The amount of times the user has rewatched/read the media
    repeat: number;
    // Priority of planning
    priority: number;
    // If the entry should only be visible to authenticated user
    private: boolean;
    // Text notes
    notes: string;
    // If the entry shown be hidden from non-custom lists
    hiddenFromStatusLists: boolean
    // When the entry was started by the user
    startedAt: FuzzyDate
    // When the entry was completed by the user
    completedAt: FuzzyDate
    // When the entry data was last updated
    updatedAt: number;
    // When the entry data was created
    createdAt: number;
    media: Media
}

export interface Media {
    // The id of the media
    id: number;
    // The mal id of the media
    idMal: number;
    // The official titles of the media in various languages
    title: MediaTitle;
    // The type of the media; anime or manga
    type: MediaType;
    // The format the media was released in
    format: MediaFormat;
    // The current releasing status of the media
    status: MediaStatus;
    // Short description of the media's story and characters
    description: string;
    // The first official release date of the media
    startDate: FuzzyDate;
    // The last official release date of the media
    endDate: FuzzyDate;
    // The season the media was initially released in
    season: MediaSeason;
    // The amount of episodes the anime has when complete
    episodes: number;
    // The general length of each anime episode in minutes
    duration: number;
    // The amount of chapters the manga has when complete
    chapters: number;
    // The amount of volumes the manga has when complete
    volumes: number;
    // If the media is officially licensed or a self-published doujin release
    isLicensed: boolean;
    // Source type the media was adapted from.
    source: MediaSource;
    // Official Twitter hashtags for the media
    hashtag: string;
    // When the media's data was last updated
    updatedAt: number;
    // The cover images of the media
    coverImage: MediaCoverImage;
    // The banner image of the media
    bannerImage: string;
    // The genres of the media
    genres: string[]
    // Alternative titles of the media
    synonyms: string[]
    // A weighted average score of all the user's scores of the media
    averageScore: number;
    // Mean score of all the user's scores of the media
    meanScore: number;
    // The number of users with the media on their list
    popularity: number;
    // List of tags that describes elements and themes of the media
    tags: MediaTag[];
    // If the media is marked as favourite by the current authenticated user
    isFavourite: boolean;
    // If the media is intended only for 18+ adult audiences
    isAdult: boolean;
    // The authenticated user's media list entry for the media
    mediaListEntry: MediaList;
    // User reviews of the media
    stats: MediaStats;
    // The url for the media page on the AniList website
    siteUrl: string;
    // If the media should have forum thread automatically created for it on airing
    // episode release
    autoCreateForumThread: boolean;
    // Notes for site moderators
    modNotes: string;
}

export type MediaTag = any;
export type MediaStats = any;
export type MediaCoverImage = any;
export type MediaSeason = any;

export interface FuzzyDate {
    year: number;
    month: number;
    day: number;
}

export type MediaListStatus = 'CURRENT'|'PLANNING'|'COMPLETED'|'DROPPED'|'PAUSED'|'REPEATING';

export interface MediaTitle {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
}

export type MediaType = 'ANIME'|'MANGA';

export type MediaFormat = 
    // Anime broadcast on television
    'TV' |
    // Anime which are under 15 minutes in length and broadcast on television
    'TV_SHORT' |
    // Anime movies with a theatrical release
    'MOVIE' |
    // Special episodes that have been included in DVD/Blu-ray releases, picture
    // dramas, pilots, etc
    'SPECIAL' |
    // (Original Video Animation) Anime that have been released directly on DVD/Blu-ray
    // without originally going through a theatrical release or television broadcast
    'OVA' |
    // (Original Net Animation) Anime that have been originally released online or are
    // only available through streaming services.
    'ONA' |
    // Short anime released as a music video
    'MUSIC' |
    // Professionally published manga with more than one chapter
    'MANGA' |
    // Written books released as a novel or series of light novels
    'NOVEL' |
    // Manga with just one chapter
    'ONE_SHOT';

export type MediaStatus = 
    // Has completed and is no longer being released
    'FINISHED' |
    // Currently releasing
    'RELEASING' |
    // To be released at a later date
    'NOT_YET_RELEASED' |
    // Ended before the work could be finished
    'CANCELLED';

export interface User {
    // The id of the user
    id: number;
    // The name of the user
    name: string;
    // The bio written by user (Markdown)
    about: string;
    // The user's avatar images
    avatar: UserAvatar
    // The user's banner images
    bannerImage: string;
    // If the authenticated user if following this user
    isFollowing: Boolean
    // The user's general options
    options: UserOptions
    // The user's media list options
    mediaListOptions: MediaListOptions
    // The users favourites
    favourites: Favourites
    // The user's statistics
    stats: UserStats
    // The number of unread notifications the user has
    unreadNotificationCount: number;
    // The url for the user page on the AniList website
    siteUrl: string;
    // The donation tier of the user
    donatorTier: number;
    // When the user's data was last updated
    updatedAt: number;
}

export type UserAvatar = any;
export type UserOptions = any;
export type MediaListOptions = any;
export type Favourites = any;
export type UserStats = any;