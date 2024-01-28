import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import doSession from './scripts/doSession.js';

const logins = await fs.readJSON('./logins.json');
const name = logins[0][0];
const password = logins[0][1];

doSession(name, password);
