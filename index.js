import puppeteer from 'puppeteer';
import fs from 'fs-extra';

const logins = await fs.readJSON('./logins.json');
const login = logins[0][0];
const password = logins[0][1];

const pageLink = 'https://instaling.pl/teacher.php?page=login';
const confirmPopupSelector = '.fc-primary-button';

const emailSelector = '#log_email';
const passwordSelector = '#log_password';
const submitSelector = 'button[type="submit"]';

const sessionSelector = '.btn-session';
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  // const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  try {
    await page.goto(pageLink);
    await page.waitForSelector(confirmPopupSelector);
    await page.$eval(confirmPopupSelector, (button) => {
      button.click();
    });

    await page.type(emailSelector, login);
    await page.type(passwordSelector, password);
    await page.click(submitSelector);

    await page.waitForSelector('.btn-session');

    await page.screenshot({ path: `./screenshots/screenshot.jpg` });
  } catch (error) {
    console.log(error);
  }

  await browser.close();
})();
