import {expect} from 'chai';
import {mapEntryToCommon} from '../../../src/services/my-anime-list/mapper';
import {myAnimeListLibraryEntry, commonLibraryEntry} from '../../response.mocks';

describe('myAnimeList mapper', () => {
    it('should map library entry', () => {
        const mapped = mapEntryToCommon(myAnimeListLibraryEntry);
        expect(mapped).to.deep.equal(commonLibraryEntry, 'mapped entry should equal expected one');
    })
})