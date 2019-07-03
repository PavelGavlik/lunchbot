import cheerio from 'cheerio';
import fetch from 'node-fetch';

const crawler = () => fetch('https://www.kavarnavelryba.cz/polednimenu/').then((r) => r.text())

const scraper = (data: string) => {
  const $ = cheerio.load(data);

  const dateMatch = $('.headline__primary').text().match(/[0-9\.]+$/);
  const today = new Date();
  const todayString = `${today.getDay()}.${today.getMonth() + 1}.`
  if (!dateMatch || dateMatch[0] !== todayString) {
    throw new Error('_Today\'s daily menu was not published._');
  }

  const heading = ':whale: *Kavárna Velryba*\n\n';
  const menus = $('.menu-list__item').text().replace(/Kč/g, "Kč\n").trim();
  return heading + menus;

  // const [soup, ...rest] = $('.menu-list__item').toArray();
  // console.log(cheerio(soup).text())
}

export const velryba = () => crawler().then(scraper);
