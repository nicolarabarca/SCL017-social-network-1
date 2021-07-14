import { signUpView } from './signUp.js';
import { signInView } from './signIn.js';

const showView = (hash) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (hash) {
    case '#/signup':
      root.appendChild(signUpView());
      break;
    case '#/signin':
      root.appendChild(signInView());
      break;
    default:
      break;
  }
};

const changePath = (hash) => {
  if (hash === '#/signup') {
    return showView(hash);
  }
  if (hash === '#/signin') {
    return showView(hash);
  }
  return showView(hash);
};

export const init = () => {
  window.addEventListener('load', changePath(window.location.hash));
  window.addEventListener('hashchange', () => {
    changePath(window.location.hash);
  });
};
