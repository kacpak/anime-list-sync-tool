import {expect} from 'chai';
import * as anilist from './AniList/mapper';
import * as mal from './MyAnimeList/mapper';
import * as commonMock from '../mocks/response.mock';
import * as aniListMock from '../mocks/AniList/response.mock';
import * as myAnimeListMock from '../mocks/MyAnimeList/response.mock';

describe('Service mappers', () => {
    const mappers = {
        AniList: {
            entry: aniListMock.cowboyPlanToWatchEntry,
            mapFunction: anilist.getCommonAnimeEntry,
            isEqualsFunction: anilist.isCommonAnimeEntryEqual
        },
        MyAnimeList: {
            entry: myAnimeListMock.cowboyPlanToWatchEntry,
            mapFunction: mal.getCommonAnimeEntry,
            isEqualsFunction: mal.isCommonAnimeEntryEqual
        }
    }

    for (let [serviceName, service] of Object.entries(mappers)) {
        describe(`${serviceName} mapper`, () => {
            it('should map service library entry to common format', () => {
                const mapped = service.mapFunction(service.entry);
                expect(mapped).to.deep.equal(commonMock.cowboyPlanToWatchEntry, 'mapped entry should equal expected one');
            })

            it('should check if mapped entry equals service entry', () => {
                const mapped = service.mapFunction(service.entry);
                const mappedEqualCheck = service.isEqualsFunction(mapped, service.entry);
                expect(mappedEqualCheck, 'directly mapped entries should be equal').to.be.true;
            })

            it('should reject entry if status differs', () => {
                const invalidEqualCheck = service.isEqualsFunction(commonMock.cowboyWatchingEntry, service.entry);
                expect(invalidEqualCheck, 'entries with fundamentally different values should be rejected').to.be.false;
            })

            it('should reject entry if score differs')
            it('should reject entry if started date differs')
            it('should reject entry if finished date differs')
            it('should reject entry if watched episodes count differs')
        })
    }
})