import updateLibrary from './library';

console.clear();
updateLibrary();

setTimeout(() => console.log('delay 120s to allow debuger inspection'), 120 * 1000);