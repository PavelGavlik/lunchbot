import { zomato } from './inputs/zomato';

const apiKey = 'dcd383753278d533660d82e9d010bd49';
const frida = zomato({
  apiKey,
  id: 16507051,
  emoji: 'coffee',
  name: 'Cafe Frida'
});
const presto = zomato({
  apiKey,
  id: 16520713,
  emoji: 'knife',
  name: 'Presto meat market'
});
const uTunelu = zomato({
  apiKey,
  id: 16524768,
  name: 'Hostinec U Tunelu'
});
const diego = zomato({
  apiKey,
  id: 18355493,
  emoji: 'burrito',
  name: 'Diego pivní bar'
});
Promise.all([frida, presto, uTunelu, diego]
  .map(promise => promise.catch((error: Error) => error.message)))
  .then((menus) => console.log(menus.join('\n\n')));
