import { velryba } from './velryba';
import { zomato } from './zomato';

Promise.all([zomato(), velryba()]).then((menus) => console.log(menus.join('\n')));
