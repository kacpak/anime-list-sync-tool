import {expect} from 'chai';
import {mapEntryToCommon, isCommonEqualToEntry} from '../../../src/services/my-anime-list/mapper';
import {myAnimeListLibraryEntry, commonLibraryEntry, invalidCommonLibraryEntry} from '../../response.mocks';

describe('MyAnimeList mapper', () => {
    it('should map service library entry to common format', () => {
        const mapped = mapEntryToCommon(myAnimeListLibraryEntry);
        expect(mapped).to.deep.equal(commonLibraryEntry, 'mapped entry should equal expected one');
    })

    it('should check if common entry equals service one', () => {
        const mapped = mapEntryToCommon(myAnimeListLibraryEntry);
        const mappedEqualCheck = isCommonEqualToEntry(mapped, myAnimeListLibraryEntry);
        expect(mappedEqualCheck, 'directly mapped entries should be equal').to.be.true;

        const invalidEqualCheck = isCommonEqualToEntry(invalidCommonLibraryEntry, myAnimeListLibraryEntry);
        expect(invalidEqualCheck, 'entries with fundamentally different values should be rejected').to.be.false;
    })
})