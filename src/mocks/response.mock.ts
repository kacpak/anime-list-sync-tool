import {CommonAnimeEntry} from '../services/common';

export const cowboyPlanToWatchEntry: CommonAnimeEntry = {
    status: 'plan-to-watch',
    score: 0,
    started: undefined,
    finished: undefined,
    watchedEpisodes: 0
};

export const cowboyWatchingEntry: CommonAnimeEntry = {
    status: 'watching',
    score: 0,
    started: undefined,
    finished: undefined,
    watchedEpisodes: 0
}