import { observer } from './lib/logic/observerFB.js';
import { init } from './lib/router.js';

observer();
window.addEventListener('load', init)

var provider = new firebase.auth.GithubAuthProvider();
