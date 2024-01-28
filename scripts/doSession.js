import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import logIn from './logIn.js';

const pageLink = 'https://instaling.pl/teacher.php?page=login';

async function doSession(name, password) {
  // TESTS
  // const browser = await puppeteer.launch({ headless: 'new' });
  // const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(pageLink);

  await logIn(page, name, password);

  await browser.close();
}

export default doSession;
