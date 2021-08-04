import { signOutUser } from '../logic/signOutFB.js';
import{ savePost, readPost, confirmDeletePost, noConfirmDeletePost } from '../logic/feedLogic.js';
import{ } from '../logic/feedLogic.js';



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

  const header = document.createElement('header');
  header.setAttribute('id', 'headerFeed');
  const headerFeed = document.createElement('h1');
  headerFeed.innerHTML = 'Tejer & Punto';
  header.appendChild(headerFeed);
  generalContainer.appendChild(header);
  
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
  /*writePost.setAttribute('size','4');
  writePost.setAttribute('maxlength', '10');
  writePost.setAttribute('required', 'required');*/
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

  const containerModal = document.createElement('div');
  containerModal.setAttribute('id', 'containerModal');

  const TextModal=document.createElement('p');
  TextModal.setAttribute('id', 'textModal');
  TextModal.innerHTML= 'Este post se eliminara para siempre!!';
  const sheepImg = document.createElement('sheepImg');
  sheepImg.setAttribute('id','sheepImg');
  TextModal.appendChild(sheepImg);
  containerModal.appendChild(TextModal);
  generalContainer.appendChild(containerModal);

  const buttonSure = document.createElement('div');
  buttonSure.setAttribute('id', 'buttonSure');
  buttonSure.addEventListener('click', confirmDeletePost);
  buttonSure.innerHTML= 'Eliminar';
  
  const buttonNoSure = document.createElement('div');
  buttonNoSure.setAttribute('id', 'buttonSure');
  buttonNoSure.addEventListener('click', noConfirmDeletePost);
  buttonNoSure.innerHTML= 'Cancelar';  
  
  const hideIdDeletePost = document.createElement('input');
  hideIdDeletePost.setAttribute('id', 'hideIdDeletePost');
  hideIdDeletePost.style.visibility = "hidden";
  
  containerModal.appendChild(buttonSure);
  containerModal.appendChild(buttonNoSure);
  containerModal.appendChild(hideIdDeletePost);
  containerModal.style.visibility = "hidden";
  generalContainer.appendChild(containerModal);
  

  const extraDiv= document.createElement('div');
  extraDiv.setAttribute('id', 'extraDiv');
  generalContainer.appendChild(extraDiv);

  generalContainer.appendChild(containerMenuFeed);
  containerFeed.appendChild(generalContainer);
  
 
  return containerFeed;


}




 
  
  
  
  
  
  
  
 
 
