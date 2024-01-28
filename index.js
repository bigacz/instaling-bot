import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    page.goto('https://instaling.pl/teacher.php?page=login');
    page.screenshot();
  } catch (error) {
    console.log(error);
  }

  await browser.close();
})();
