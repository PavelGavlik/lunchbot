import fetch from 'node-fetch';

/* TODO: use these:
https://www.zomato.com/cs/praha/jin%C3%A1-krajina-nov%C3%A9-m%C4%9Bsto-praha-1/denn%C3%AD-menu
https://www.zomato.com/cs/praha/bistroos-nov%C3%A9-m%C4%9Bsto-praha-1/denn%C3%AD-menu
https://www.zomato.com/cs/praha/serial-burgers-nov%C3%A9-m%C4%9Bsto-praha-1/denn%C3%AD-menu
 */

interface Dish {
  name: string;
  price: string;
}

interface ZomatoResponse {
  daily_menus: {
    daily_menu: {
      dishes: {
        dish: Dish
      }[]
    },
  }[];
  status: 'success'
}

const crawler = () => {
  if (typeof process.env.ZOMATO_API_KEY !== 'string') {
    throw new Error('ZOMATO_API_KEY environment variable is missing');
  }
  const headers = { 'user_key': process.env.ZOMATO_API_KEY };
  return fetch('https://developers.zomato.com/api/v2.1/dailymenu?res_id=16507069', { headers }).then((r) => r.json());
};

const scraper = (data: ZomatoResponse) => {
  const heading = ':mushroom: *La Loca*\n\n';
  if (!data.daily_menus.length) {
    throw new Error('_Today\'s daily menu was not published._')
  }

  const menus = data.daily_menus[0].daily_menu.dishes
    .map(({ dish }) => `${dish.name}\n${dish.price}\n`)
    .join('\n');
  return heading + menus;
};

export const zomato = () => crawler().then(scraper);
