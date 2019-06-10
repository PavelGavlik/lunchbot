import { velryba } from './velryba';
import { zomato } from './zomato';

Promise.all([zomato(), velryba()].map(promise => promise.catch((error: Error) => error.message)))
  .then((menus) => console.log(menus.join('\n')));
