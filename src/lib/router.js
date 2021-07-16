import { introView } from './intro.js';
import { signUpView } from './signUp.js';
import { signInView } from './signIn.js';
import { mainMenuView } from './mainMenu.js';

const showView = (hash) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (hash) {
    case '':
      root.appendChild(introView());
      break;
    case '#/intro':
      root.appendChild(introView());
      break;
    case '#/signup':
      root.appendChild(signUpView());
      break;
    case '#/signin':
      root.appendChild(signInView());
      break;
    case '#/mainmenu':
      root.appendChild(mainMenuView());
    default:
      break;
  }
};

const changePath = (hash) => {
  if (hash === '') {
    return showView(hash);
  }
  if (hash === '#/intro') {
    return showView(hash);
  }
  if (hash === '#/signup') {
    return showView(hash);
  }
  if (hash === '#/signin') {
    return showView(hash);
  }
  if (hash === '#/mainmenu') {
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
