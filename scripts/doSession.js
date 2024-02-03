import puppeteer from 'puppeteer';
import logIn from './logIn.js';
import completeWord from './completeWord.js';
import isEnd from './isEnd.js';
import isVisible from './isVisible.js';

const pageLink = 'https://instaling.pl/teacher.php?page=login';
const endSessionSelector = '#return_mainpage';

async function doSession(name, password) {
  // TESTS
  // const browser = await puppeteer.launch({ headless: 'new' });
  // const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(pageLink);

  await logIn(page, name, password);

  let isEndVisible;
  while (!isEndVisible) {
    await completeWord(page);

    await page.waitForTimeout(50);

    isEndVisible = await isVisible(endSessionSelector, page);
  }

  await browser.close();
}

export default doSession;
