import fetch from 'node-fetch';

interface ZomatoConfig {
  apiKey: string,
  id: number,
  emoji?: string,
  name: string
}

 // Types modelled after https://developers.zomato.com/documentation#!/restaurant/restaurant (incomplete)
interface Dish {
  name: string;
  price: string;
}

export interface ZomatoResponse {
  daily_menus: {
    daily_menu: {
      start_date: string;
      dishes: {
        dish: Dish
      }[]
    },
  }[];
  status: 'success'
}

export const crawler = (config: ZomatoConfig) => {
  if (typeof config.apiKey !== 'string') {
    throw new Error('zomato api key was not passed in config');
  }
  const url = `https://developers.zomato.com/api/v2.1/dailymenu?res_id=${config.id}`;
  const headers = { 'user_key': config.apiKey };
  return fetch(url, { headers }).then((r) => r.json());
};

const isTodaysDate = (today: Date, data: ZomatoResponse) =>
  today.toISOString().substr(0, 10) === data.daily_menus[0].daily_menu.start_date.substr(0, 10)

export const scraper = (config: ZomatoConfig) => (data: ZomatoResponse, today = new Date()) => {
  const heading = `:${config.emoji || 'knife_fork_plate'}: *${config.name}*\n\n`;
  if (!data.daily_menus || !data.daily_menus.length || !isTodaysDate(today, data)) {
    throw new Error('_Today\'s daily menu was not published._')
  }

  const menus = data.daily_menus[0].daily_menu.dishes
    .map(({ dish }) => `${dish.name.trim().replace(/ +/g, ' ')}\n${dish.price}\n`)
    .join('\n');
  return heading + menus;
};

export const zomato = (config: ZomatoConfig) => crawler(config).then(scraper(config));
