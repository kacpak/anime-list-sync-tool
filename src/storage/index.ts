import * as Datastore from 'nedb-promise';
import * as fs from 'fs';

const storageDir = 'storage';

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir);
}

export default new Datastore({
  filename: `${storageDir}/database.json`,
  autoload: true
});
