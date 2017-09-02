import isDebug from './util/is-debug';
import updateLibrary from './library';

if (isDebug) {
    console.clear();
    console.debug('Debug mode detected');
    setTimeout(() => console.info('Guaranteed debugger inspection ended'), 300 * 1000);
}

// updateLibrary();