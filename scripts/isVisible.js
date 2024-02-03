async function isVisible(selector, page) {
  const returnValue = await page.evaluate((selectorWrap) => {
    const element = document.querySelector(selectorWrap);

    const { offsetParent } = element;
    const visibility = offsetParent !== null;

    return visibility;
  }, selector);

  return returnValue;
}

export default isVisible;
