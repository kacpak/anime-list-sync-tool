import {expect} from 'chai';
import {CommonAnimeEntry} from './common';
import * as anilist from './AniList/mapper';
import * as mal from './MyAnimeList/mapper';
import * as commonMock from '../mocks/response.mock';
import * as aniListMock from '../mocks/AniList/response.mock';
import * as myAnimeListMock from '../mocks/MyAnimeList/response.mock';

interface Mapper {
    entry: any;
    getCommonAnime: (entry: any) => CommonAnimeEntry;
    isAnimeEqual: (commonEntry: CommonAnimeEntry, entry: any) => boolean;
}

describe('Service mappers', () => {
    const mappers: {[key: string]: Mapper} = {
        AniList: {
            entry: aniListMock.cowboyPlanToWatchEntry,
            getCommonAnime: anilist.getCommonAnimeEntry,
            isAnimeEqual: anilist.isCommonAnimeEntryEqual
        },
        MyAnimeList: {
            entry: myAnimeListMock.cowboyPlanToWatchEntry,
            getCommonAnime: mal.getCommonAnimeEntry,
            isAnimeEqual: mal.isCommonAnimeEntryEqual
        }
    }

    for (let [serviceName, service] of Object.entries(mappers)) {
        describe(`${serviceName} mapper`, () => {
            it('should map service library entry to common format', () => {
                const mapped = service.getCommonAnime(service.entry);
                expect(mapped).to.deep.equal(commonMock.cowboyPlanToWatchEntry, 'mapped entry should equal expected one');
            })

            it('should check if mapped entry equals service entry', () => {
                const mapped = service.getCommonAnime(service.entry);
                const mappedEqualCheck = service.isAnimeEqual(mapped, service.entry);
                expect(mappedEqualCheck, 'directly mapped entries should be equal').to.be.true;
            })

            it('should reject entry if status differs', () => {
                const invalidEqualCheck = service.isAnimeEqual(commonMock.cowboyWatchingEntry, service.entry);
                expect(invalidEqualCheck, 'entries with fundamentally different values should be rejected').to.be.false;
            })

            it('should reject entry if score differs')
            it('should reject entry if started date differs')
            it('should reject entry if finished date differs')
            it('should reject entry if watched episodes count differs')
        })
    }
})