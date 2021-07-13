import { firebaseConfig } from './lib/firebConfig.js';
import { changePath } from './lib/router.js';

firebase.initializeApp(firebaseConfig);

const init = () => {
  window.addEventListener('hashchange', () => {
    changePath(window.location.hash);
  })
};

window.addEventListener('load', init);