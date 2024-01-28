import fs from 'fs-extra';

const storage = await fs.readJSON('./data/words.json');

const untranslatedSelector = '.translations';
const translatedSelector = '#word';
const answerSelector = '#answer';
const submitSelector = '#check';
const nextWordSelector = '#nextword';

async function completeWord(page) {
  // needs tweaking, two elements with the same selector
  // await page.waitForSelector(untranslatedSelector);
  await page.waitForTimeout(100);
  //

  const untranslated = await page.$eval(
    untranslatedSelector,
    (e) => e.textContent
  );

  const translations = storage.find((element) => element[0] === untranslated);

  if (translations !== undefined) {
    await page.type(answerSelector, translations[1]);
    await page.click(submitSelector);
  } else {
    await page.click(submitSelector);

    // needs improving
    await page.waitForTimeout(100);
    //

    const correct = await page.$eval(translatedSelector, (e) => e.textContent);

    if (correct) {
      // can be improved to read if the word exists, for preventing errors
      storage.push([untranslated, correct]);
    }

    await fs.writeJSON('./data/words.json', storage);
  }

  // needs improving
  await page.waitForTimeout(100);
  //
  await page.click(nextWordSelector);
}

export default completeWord;
