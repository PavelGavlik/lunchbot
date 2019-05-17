import { velryba } from './velryba';
import { zomato } from './zomato';

Promise.all([velryba(), zomato()]).then((menus) => console.log(menus.join('\n\n')));
