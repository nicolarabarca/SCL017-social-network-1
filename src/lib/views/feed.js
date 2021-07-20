import { signOutUser } from '../logic/signOutFB.js';

export const feedView = () => {
  const containerFeed = document.createElement('div');
  containerFeed.setAttribute('id', 'containerFeed');
  const divSignOut = document.createElement('div');
  const buttonSignOut = document.createElement('button');
  buttonSignOut.innerHTML = 'Cerrar sesión';
  buttonSignOut.addEventListener('click', signOutUser);
  divSignOut.appendChild(buttonSignOut);
  containerFeed.appendChild(divSignOut);
  return containerFeed;
}
