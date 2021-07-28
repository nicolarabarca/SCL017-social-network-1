import { signOutUser } from '../logic/signOutFB.js';
import{ savePost } from '../../main.js';
import { deletePost } from '../../main.js';

export const feedView = () => {

  const containerFeed = document.createElement('div');
  containerFeed.setAttribute('id', 'containerFeed');

  const generalContainer=document.createElement('div');
  generalContainer.setAttribute('id', 'generalContainer');
  const containerMenuFeed= document.createElement ('ul');
  containerMenuFeed.setAttribute('id', 'containerMenuFeedUl');
  
  
  const boxHome  = document.createElement('li');
  boxHome.setAttribute('id', 'boxHome');
  boxHome.innerHTML = '<a href="#/mainmenu"></a>';
  containerMenuFeed.appendChild(boxHome);
  
    
 
  
  const boxPatterns= document.createElement('li');
  boxPatterns.setAttribute('id', 'boxPatterns');
  boxPatterns.innerHTML = '<a href="#/patterns">Patrones</a>';
  containerMenuFeed.appendChild(boxPatterns);

  const boxMiscelaneo= document.createElement('li');
  boxMiscelaneo.setAttribute('id', 'boxmiscelaneo');
  boxMiscelaneo.innerHTML = '<a href="#/miscellaneous">misceláneo</a>';
  containerMenuFeed.appendChild(boxMiscelaneo);
 
  
  const boxSignOutUser  = document.createElement('li');
  boxSignOutUser.setAttribute('id', 'boxsignOutUser');
  boxSignOutUser.addEventListener('click', signOutUser );
  containerMenuFeed.appendChild(boxSignOutUser);
  
  

  const containerPost = document.createElement('div')
  const formPost=document.createElement('form');
  formPost.setAttribute('id','formPost');
  containerPost.setAttribute('id', 'containerPost');
  const writePost = document.createElement('input');
  writePost.setAttribute('id', 'writePost');
  writePost.setAttribute('id', 'writePost');
  writePost.setAttribute('type', 'text');
  writePost.setAttribute('placeholder', 'Escribe lo que piensas');
  containerPost.appendChild(writePost);
  formPost.appendChild(containerPost);


  const divButtonPost= document.createElement('div');
  divButtonPost.setAttribute('id','divButtonPost');
  const buttonPost = document.createElement('button');
  buttonPost.setAttribute('id', 'buttonPost');
  buttonPost.addEventListener('click', savePost);
  divButtonPost.appendChild(buttonPost);
  formPost.appendChild(divButtonPost);
  generalContainer.appendChild(formPost);

  const extraDiv= document.createElement('div');
  extraDiv.setAttribute('id', 'extraDiv');
  generalContainer.appendChild(extraDiv);

  generalContainer.appendChild(containerMenuFeed);
  containerFeed.appendChild(generalContainer);

  const buttonTest = document.createElement('button');
  buttonTest.innerHTML = 'borrar';
  buttonTest.setAttribute('id', 'delete-button');
  buttonTest.addEventListener('click', deletePost);
  containerFeed.appendChild(buttonTest);
  
  return containerFeed;


}

