import cheerio from 'cheerio';
import fetch from 'node-fetch';

const crawler = () => fetch('https://www.kavarnavelryba.cz/polednimenu/').then((r) => r.text())

export const scraper = (data: string, today = new Date()) => {
  const $ = cheerio.load(data);

  const dateMatch = $('.headline__primary').text().match(/[0-9\.]+$/);
  const todayString = `${today.getDate()}.${today.getMonth() + 1}.`
  if (!dateMatch || dateMatch[0] !== todayString) {
    throw new Error('_Today\'s daily menu was not published._');
  }

  const heading = ':whale: *Kavárna Velryba*\n\n';
  const isEmptyRow = (index: number, row: CheerioElement) => cheerio(row).text().trim() !== 'Kč';
  const menus = $('.menu-list__item').filter(isEmptyRow).text().replace(/Kč/g, "Kč\n").trim();
  return heading + menus;
}

export const velryba = () => crawler().then(scraper);
