const fetch = require('node-fetch');
const cheerio = require('cheerio');

const crawler = () => fetch('https://www.kavarnavelryba.cz/polednimenu/').then((r) => r.text())

const scraper = (data) => {
    const $ = cheerio.load(data);

    // TODO check date
    console.log($('.headline__primary').text() + '\n');
    console.log(':whale: *Kavárna Velryba*\n', $('.menu-list__item').text().replace(/Kč/g, "Kč\n").trimRight());

    // const [soup, ...rest] = $('.menu-list__item').toArray();
    // console.log(cheerio(soup).text())
}

crawler().then(scraper);
