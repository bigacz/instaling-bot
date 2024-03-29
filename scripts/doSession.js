import puppeteer from 'puppeteer';
import logIn from './logIn.js';
import completeWord from './completeWord.js';
import isVisible from './isVisible.js';
import removePopup from './removePopup.js';

const pageLink = 'https://instaling.pl/teacher.php?page=login';
const endSessionSelector = '#return_mainpage';

async function doSession(name, password) {
  // TESTS
  // const browser = await puppeteer.launch({ headless: 'new' });
  // const browser = await puppeteer.launch({ headless: false, slowMo: 20 });
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(pageLink);

  await logIn(page, name, password);

  let isEndVisible;
  while (!isEndVisible) {
    await removePopup(page);

    await page.waitForTimeout(100);

    try {
      await completeWord(page);
    } catch (error) {
      await browser.close();
      return false;
    }

    await page.waitForTimeout(100);

    isEndVisible = await isVisible(endSessionSelector, page);
  }

  await browser.close();

  console.log(`Session for ${name} completed!`);
  return true;
}

export default doSession;
