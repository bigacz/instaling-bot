const confirmPopupSelector = '.fc-primary-button';

const emailSelector = '#log_email';
const passwordSelector = '#log_password';
const submitSelector = 'button[type="submit"]';

const sessionSelector = '.btn-session';

// this breaks sometimes
const startSessionSelector = '#continue_session_button';

async function logIn(page, name, password) {
  try {
    await page.waitForSelector(confirmPopupSelector);
    await page.$eval(confirmPopupSelector, (button) => {
      button.click();
    });

    await page.type(emailSelector, name);
    await page.type(passwordSelector, password);
    await page.click(submitSelector);

    await page.waitForSelector(sessionSelector);
    await page.click(sessionSelector);

    await page.waitForSelector(startSessionSelector);
    await page.click(startSessionSelector);
  } catch (error) {
    console.log(error);
  }
}

export default logIn;
