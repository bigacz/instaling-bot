import fs from 'fs-extra';

const storage = await fs.readJSON('./data/words.json');

const untranslatedSelector = '.translations';
const translatedSelector = '#word';
const answerSelector = '#answer';
const submitSelector = '#check';
const nextWordSelector = '#nextword';
const usageSelector = '.usage_example';

async function completeWord(page) {
  // needs tweaking, two elements with the same selector
  // await page.waitForSelector(untranslatedSelector);
  await page.waitForTimeout(100);
  //

  const untranslated = await page.$eval(
    untranslatedSelector,
    (e) => e.textContent
  );

  const example = await page.$eval(usageSelector, (e) => e.textContent);

  const translations = storage.find(
    (element) => element[0] === untranslated && element[1] === example
  );

  await page.waitForTimeout(100);

  if (translations !== undefined) {
    // TODO improve

    await page.type(answerSelector, translations[2]);
    await page.click(submitSelector);
  } else {
    await page.click(submitSelector);

    // needs improving
    await page.waitForTimeout(100);
    //

    const correct = await page.$eval(translatedSelector, (e) => e.textContent);

    if (correct.length > 0) {
      // can be improved to read if the word exists, for preventing errors
      storage.push([untranslated, example, correct]);
      await fs.writeJSON('./data/words.json', storage);
      // i think it works i changed it after commenting in index.js at 5am
    }
  }

  // needs improving
  await page.waitForTimeout(100);
  //
  await page.click(nextWordSelector);
}

export default completeWord;
