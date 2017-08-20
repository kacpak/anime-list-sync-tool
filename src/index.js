import env from './util/env';
import * as anilist from './services/anilist';

console.log('MAL username', env.MAL_USERNAME, 'MAL password', env.MAL_PASSWORD);
setTimeout(() => console.log('info after 3s'), 3000);

anilist.searchAnime('full metal alchemist');