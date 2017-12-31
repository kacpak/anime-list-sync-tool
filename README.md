# Anime List Synchronisation Tool [![Build Status](https://travis-ci.org/kacpak/anime-list-sync-tool.svg?branch=master)](https://travis-ci.org/kacpak/anime-list-sync-tool)
> Synchronizes your anime/manga lists between AniList and MyAnimeList

## Requirements
* Node.js 8 LTS
* yarn
* `yarn install` in root directory to fetch required project dependencies
* `cp .env-example .env` in root directory and update `.env` with proper values

## Running
* `yarn start` in root directory

## Development
* `yarn build` to build application for use with `yarn start`
* `yarn dev` to run application in debug mode compiling on the fly
* `yarn test` to run tests
    * `yarn test:dev` to run tests continously with code changes watcher

# AniList
## Client
* [Create new Api v2 client](https://anilist.co/settings/developer/v2/client/new)
    * `Name` - your application name
    * `Client Redirect Uri` - `http://localhost:8666`