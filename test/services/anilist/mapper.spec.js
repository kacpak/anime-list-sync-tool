import {expect} from 'chai';
import {mapEntryToCommon} from '../../../src/services/anilist/mapper';
import {aniListLibraryEntry, commonLibraryEntry} from '../../response.mocks';

describe('AniList mapper', () => {
    it('should map library entry', () => {
        const mapped = mapEntryToCommon(aniListLibraryEntry);
        expect(mapped).to.deep.equal(commonLibraryEntry, 'mapped entry should equal expected one');
    })
})