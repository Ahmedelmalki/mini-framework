
import { Router } from '../framework/Router.js';
import { routes } from './routes.js';

const container = document.getElementById('root');
console.log('zbi')
// Initialize the router
const router = new Router(routes, container);


export default router;
