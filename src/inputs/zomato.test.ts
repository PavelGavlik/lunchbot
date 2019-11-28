import assert from 'assert';
import { scraper, ZomatoResponse } from './zomato';

describe('Zomato', () => {
  const config = {
    apiKey: 'somerandom64hash',
    id: 4321,
    emoji: 'hamburger',
    name: 'Moe\'s'
  };
  const response: ZomatoResponse = {
    "daily_menus": [
      {
        "daily_menu": {
          "start_date": "2000-02-01 00:00:00",
          "dishes": [
            {
              "dish": {
                "name": "bálkánská s masem  ",
                "price": "10 Kč"
              }
            },
            {
              "dish": {
                "name": "brokolicová ",
                "price": "10 Kč"
              }
            },
            {
              "dish": {
                "name": "150g Teriyaki / grilované  kousky lososa, chobotnic a tresky s    Japonskou  omáčkou Teriyaki s schitake houbami, pórkem,  asijskou  zeleninou a čerstvým koriandrem, rýže basmati             ",
                "price": "149 Kč"
              }
            },
            {
              "dish": {
                "name": " „Bulgurové rizoto“ s haloumi sýrem, grilovanou zeleninou,   sušeným rajčetem a pažitkovým krémem se zakysané   smetany, zeleninový salátek ",
                "price": "125 Kč"
              }
            },
          ]
        }
      }
    ],
    "status": "success"
  };

  it('is able to parse menu', () => {
    const result = scraper(config)(response, new Date("2000-02-01T23:00:00.000Z"));
    assert.ok(result.includes(':hamburger: *Moe\'s*'), 'contains heading')
    assert.ok(result.includes('bálkánská s masem\n10 Kč'), 'contains soup')
    const mainMeal = '„bulgurové rizoto“ s haloumi sýrem, grilovanou zeleninou, sušeným rajčetem a pažitkovým krémem se zakysané smetany, zeleninový salátek\n125 Kč';
    assert.ok(result.includes(mainMeal), 'contains main meal')
  });

  it('throws if menu is out of date', () => {
    assert.throws(
      () => scraper(config)(response, new Date("2000-01-01T23:00:00.000Z")),
      {
        name: 'Error',
        message: '_Today\'s daily menu was not published._'
      }
    );
  });

  it('throws if menu is in wrong format', () => {
    assert.throws(
      // @ts-ignore Invalid type passed intentionally
      () => scraper(config)({ some: 'invalid object' }),
      {
        name: 'Error',
        message: '_Today\'s daily menu was not published._'
      }
    );
  });
});
