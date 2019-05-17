import fetch from 'node-fetch';

const ZOMATO_API_KEY = 'dcd383753278d533660d82e9d010bd49';

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
  console.log(':mushroom: *La Loca*\n');
  const menus = data.daily_menus[0].daily_menu.dishes
    .map(({ dish }) => `${dish.name}\n${dish.price}\n`)
    .join('\n');
  console.log(menus);
}

crawler().then(scraper);
