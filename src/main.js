import { firebaseConfig } from './lib/firebConfig.js';
import { observer } from './observerFB.js';
import { init } from './lib/router.js';

firebase.initializeApp(firebaseConfig);
observer();
window.addEventListener('load', init);
