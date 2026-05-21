import { chromium } from "playwright";

const CONFIG = {
  baseUrl: "https://groupsor.link",
  timeout: 60000
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function scrapeGroups(keyword, limit = 30) {

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  try {

    const url =
      `${CONFIG.baseUrl}/group/search?keyword=${encodeURIComponent(keyword)}`;

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: CONFIG.timeout
    });

    await delay(3000);

    for (let i = 0; i < 10; i++) {

      const btn = await page.$("#load_more");

      if (!btn) break;

      await btn.click();

      await delay(2500);

    }

    const groups = await page.$$eval(
      ".maindiv",
      (elements) => {

        return elements.map(el => {

          const title =
            el.querySelector("a")?.innerText?.trim() || "No title";

          const href =
            el.querySelector("a")?.href || "";

          const image =
            el.querySelector("img")?.src || "";

          return {
            title,
            link: href,
            image
          };

        });

      }
    );

    await browser.close();

    return groups.slice(0, limit);

  } catch (e) {

    await browser.close();

    throw e;

  }

}
