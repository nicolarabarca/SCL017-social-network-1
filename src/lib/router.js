import { introView } from './views/intro.js';
import { signUpView } from './views/signUp.js';
import { signInView } from './views/signIn.js';
import { mainMenuView } from './views/mainMenu.js';
import { feedView } from './views/feed.js';
import { patternsView } from './views/pattern.js';
import { miscellaneousView } from './views/miscellaneous.js';
import { readPost } from './logic/feedLogic.js';

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
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          root.appendChild(mainMenuView());
          // console.log('Existe usuario activo');
        } else {
          window.location.href = '#/intro';
          // console.log('No existe usuario activo');
        }
      });
      break;
    case '#/feed':
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          root.appendChild(feedView());
          readPost();// se cargan los post existentes en base de datos
          // console.log('Existe usuario activo');
        } else {
          window.location.href = '#/intro';
          // console.log('No existe usuario activo');
        }
      });
      break;
    case '#/patterns':
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          root.appendChild(patternsView());
          // console.log('Existe usuario activo');
        } else {
          window.location.href = '#/intro';
          // console.log('No existe usuario activo');
        }
      });
      break;
    case '#/miscellaneous':
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          root.appendChild(miscellaneousView());
          // console.log('Existe usuario activo');
        } else {
          window.location.href = '#/intro';
          // console.log('No existe usuario activo');
        }
      });
      break;
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
  if (hash === '#/feed') {
    return showView(hash);
  }
  if (hash === '#/patterns') {
    return showView(hash);
  }
  if (hash === '#/miscellaneous') {
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
