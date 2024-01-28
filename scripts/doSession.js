import puppeteer from 'puppeteer';
import logIn from './logIn.js';
import completeWord from './completeWord.js';

const pageLink = 'https://instaling.pl/teacher.php?page=login';

async function doSession(name, password) {
  // TESTS
  // const browser = await puppeteer.launch({ headless: 'new' });
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  // const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(pageLink);

  await logIn(page, name, password);
  await completeWord(page);

  // Testing only
  await page.screenshot({ path: './screenshots/screenshot.jpg' });
  //
  await browser.close();
}

export default doSession;
