import fs from 'fs-extra';
import doSession from './scripts/doSession.js';

const logins = await fs.readJSON('./data/logins.json');

for (let i = 0; i < logins.length; i += 1) {
  const name = logins[i][0];
  const password = logins[i][1];

  await doSession(name, password);
}
