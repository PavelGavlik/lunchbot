const fetch = require('node-fetch');
const cheerio = require('cheerio');

const crawler = () => fetch('https://www.kavarnavelryba.cz/polednimenu/').then((r) => r.text())

// TODO: zomato https://github.com/igorkulman/lunchbuddy-bot/blob/master/src/providers/custom.js

const scraper = (data) => {
    const $ = cheerio.load(data);

    // TODO check date
    console.log('*Kavárna Velryba*', $('.menu-list__item').text());

    // const [soup, ...rest] = $('.menu-list__item').toArray();
    // console.log(cheerio(soup).text())
}

crawler().then(scraper);
