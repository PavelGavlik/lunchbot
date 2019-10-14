import { velryba } from './velryba';
import { zomato } from './zomato';

const apiKey = 'dcd383753278d533660d82e9d010bd49';
const jinaKrajina = zomato({
  apiKey,
  id: 16506026,
  emoji: 'earth_asia',
  name: 'Jiná krajina'
});
const serialBurgers = zomato({
  apiKey,
  id: 18257533,
  emoji: 'knife',
  name: 'Serial burgers'
});
Promise.all([jinaKrajina, serialBurgers, velryba()]
  .map(promise => promise.catch((error: Error) => error.message)))
  .then((menus) => console.log(menus.join('\n\n')));
