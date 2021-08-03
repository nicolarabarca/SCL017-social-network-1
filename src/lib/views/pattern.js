
import { signOutUser } from '../logic/signOutFB.js';

export const patternsView = () => {

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

  const header = document.createElement('header');
  header.setAttribute('id', 'headerFeed');
  const headerFeed = document.createElement('h1');
  headerFeed.innerHTML = 'Tejer & Punto';
  header.appendChild(headerFeed);
  generalContainer.appendChild(header);

//COPIA Y PASAR A PATRONES//
const containerPostPattern = document.createElement('div')
  const formPostPattern=document.createElement('form');
  formPostPattern.setAttribute('id','formPostPattern');
  containerPostPattern.setAttribute('id', 'containerPostPattern');
  const writePostPattern = document.createElement('input');
  writePostPattern.setAttribute('id', 'writePostPattern');
  writePostPattern.setAttribute('type', 'text');
  /*writePost.setAttribute('size','4');
  writePost.setAttribute('maxlength', '10');
  writePost.setAttribute('required', 'required');*/
  writePostPattern.setAttribute('placeholder', 'Comparte Patrones');
  formPostPattern.appendChild(writePostPattern);
  containerPostPattern.appendChild(formPostPattern);


  const divButtonPostPattern= document.createElement('div');
  divButtonPostPattern.setAttribute('id','divButtonPostPattern');
  const buttonPostPattern = document.createElement('button');
  buttonPostPattern.setAttribute('id', 'buttonPostPattern');
  /*buttonPostPattern.addEventListener('click', savePost);*/
  divButtonPostPattern.appendChild(buttonPostPattern);
  
  formPostPattern.appendChild(divButtonPostPattern);
  generalContainer.appendChild(formPostPattern);
/*
  //AQUI EMPIEZA LA WEA DE PATTERNS//
  const divPostPattern= document.createElement('div');
            divPostPattern.setAttribute('class', 'divPostPattern');

            const textPostPattern= document.createElement('div');
            textPostPattern.setAttribute('class', 'textPostPattern'); 
 
            const pPostPattern = document.createElement('p');
  pPostPattern.setAttribute('id', 'pPostPattern');
  pPostPattern.innerHTML = 'Patrones en construcción ';

  textPostPattern.appendChild(pPostPattern);
  divPostPattern.appendChild(textPostPattern); 


*/

  /*containerMenuFeed.appendChild(divPostPattern);*/
 /* containerPostPattern.appendChild(formPostPattern);*/
 generalContainer.appendChild(containerPostPattern)
  generalContainer.appendChild(containerMenuFeed);
  containerFeed.appendChild(generalContainer);
  return containerFeed;

}
