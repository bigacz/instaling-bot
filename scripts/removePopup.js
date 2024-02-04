import isVisible from './isVisible.js';

const knowButtonSelector = '#know_new';
const skipSelector = '#skip';

async function removePopup(page) {
  const isPopupVisible = await isVisible(knowButtonSelector, page);

  if (isPopupVisible) {
    await page.click(knowButtonSelector);

    await page.waitForTimeout(100);

    await page.click(skipSelector);
  }

  await page.waitForTimeout(200);

  const isStillVisible = await isVisible(knowButtonSelector, page);
  if (isStillVisible) {
    await removePopup(page);
  }
}

export default removePopup;
