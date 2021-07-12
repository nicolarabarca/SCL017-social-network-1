import { firebaseConfig } from './lib/firebConfig.js';
import { signUpFunction } from './lib/signUp.js';
import { signInFunction } from './lib/signIn.js';

firebase.initializeApp(firebaseConfig);

const changePath = (hash) => {
  if (hash === '#/signup') {
    return showView(hash);
  } else if (hash === '#/signin') {
    return showView(hash);
  } else {
    return showView(hash);
  }
};

const showView = (hash) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (hash) {
    case '#/signin':
      root.appendChild(signInFunction());
      break;
    case '#/signup':
      root.appendChild(signUpFunction());
      break;
    default:
      root.innerHTML = '<h2>No existe</h2>';
      break;
  }
}

const init = () => {
  window.addEventListener('hashchange', () => {
    changePath(window.location.hash);
  })
}

window.addEventListener('load', init);