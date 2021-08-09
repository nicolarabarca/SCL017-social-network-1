import { observer } from './lib/logic/observerFB.js';
import { init } from './lib/router.js';

observer();
window.addEventListener('load', init) // se llama la funcion Init  para asociar  las funciones de  router 
// de  ruteo para la app
