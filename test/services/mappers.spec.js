import {expect} from 'chai';
import * as anilist from '../../src/services/anilist/mapper';
import * as mal from '../../src/services/my-anime-list/mapper';
import {myAnimeListLibraryEntry, aniListLibraryEntry, commonLibraryEntry, invalidCommonLibraryEntry} from '../response.mocks';

describe('Service mappers', () => {
    const mappers = {
        AniList: {
            entry: aniListLibraryEntry,
            mapFunction: anilist.mapEntryToCommon,
            isEqualsFunction: anilist.isCommonEqualToEntry
        },
        MyAnimeList: {
            entry: myAnimeListLibraryEntry,
            mapFunction: mal.mapEntryToCommon,
            isEqualsFunction: mal.isCommonEqualToEntry
        }
    }

    for (let [serviceName, service] of Object.entries(mappers)) {
        describe(`${serviceName} mapper`, () => {
            it('should map service library entry to common format', () => {
                const mapped = service.mapFunction(service.entry);
                expect(mapped).to.deep.equal(commonLibraryEntry, 'mapped entry should equal expected one');
            })

            it('should check if mapped entry equals service entry', () => {
                const mapped = service.mapFunction(service.entry);
                const mappedEqualCheck = service.isEqualsFunction(mapped, service.entry);
                expect(mappedEqualCheck, 'directly mapped entries should be equal').to.be.true;
            })

            it('should reject entry if status differs', () => {
                // TODO check for different combinations of values
                const invalidEqualCheck = service.isEqualsFunction(invalidCommonLibraryEntry, service.entry);
                expect(invalidEqualCheck, 'entries with fundamentally different values should be rejected').to.be.false;
            })

            it('should reject entry if score differs')
            it('should reject entry if started date differs')
            it('should reject entry if finished date differs')
            it('should reject entry if watched episodes count differs')
        })
    }
})