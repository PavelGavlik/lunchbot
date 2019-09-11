import { velryba } from './velryba';
import { zomato } from './zomato';

const zomatoConfig = {
  apiKey: 'dcd383753278d533660d82e9d010bd49',
  id: 16506026,
  emoji: 'earth_asia',
  name: 'Jiná krajina'
};
Promise.all([zomato(zomatoConfig)/*, velryba()*/].map(promise => promise.catch((error: Error) => error.message)))
  .then((menus) => console.log(menus.join('\n')));
