import { signUpView } from './signUp.js';
import { signInView } from './signIn.js';

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
      root.appendChild(signInView());
      break;
    case '#/signup':
      root.appendChild(signUpView());
      break;
    default:
      root.innerHTML = '<h2>No existe</h2>';
      break;
  }
};

export const init = () => {
  window.addEventListener('hashchange', () => {
    changePath(window.location.hash);
  })
};
