import {expect} from 'chai';
import {mapEntryToCommon, isCommonEqualToEntry} from '../../../src/services/anilist/mapper';
import {aniListLibraryEntry, commonLibraryEntry, invalidCommonLibraryEntry} from '../../response.mocks';

describe('AniList mapper', () => {
    it('should map service library entry to common format', () => {
        const mapped = mapEntryToCommon(aniListLibraryEntry);
        expect(mapped).to.deep.equal(commonLibraryEntry, 'mapped entry should equal expected one');
    })

    it('should check if common entry equals service one', () => {
        const mapped = mapEntryToCommon(aniListLibraryEntry);
        const mappedEqualCheck = isCommonEqualToEntry(mapped, aniListLibraryEntry);
        expect(mappedEqualCheck, 'directly mapped entries should be equal').to.be.true;

        const invalidEqualCheck = isCommonEqualToEntry(invalidCommonLibraryEntry, aniListLibraryEntry);
        expect(invalidEqualCheck, 'entries with fundamentally different values should be rejected').to.be.false;
    })
})