async function isEnd(page) {
  const isVisible = await page.evaluate(() => {
    const returnSelector = '#return_mainpage';
    const button = document.querySelector(returnSelector);

    const returnValues = [button.style.top, button.style.bottom];

    return returnValues;
  });

  return isVisible;
}

export default isEnd;
