import { firebaseConfig } from './lib/firebConfig.js';
import { init } from './lib/router.js';

firebase.initializeApp(firebaseConfig);
window.addEventListener('load', init);
