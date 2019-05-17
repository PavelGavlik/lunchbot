import cheerio from 'cheerio';
import fetch from 'node-fetch';

const crawler = () => fetch('https://www.kavarnavelryba.cz/polednimenu/').then((r) => r.text())

const scraper = (data: string) => {
  const $ = cheerio.load(data);

  // TODO check date
  console.log($('.headline__primary').text() + '\n');

  const heading = ':whale: *Kavárna Velryba*\n\n';
  const menus = $('.menu-list__item').text().replace(/Kč/g, "Kč\n").trim();
  return heading + menus;

  // const [soup, ...rest] = $('.menu-list__item').toArray();
  // console.log(cheerio(soup).text())
}


export const velryba = () => crawler().then(scraper);
