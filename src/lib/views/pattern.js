
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

  const divPostPattern= document.createElement('div');
            divPostPattern.setAttribute('class', 'divPostPattern');

            const textPost= document.createElement('div');
            textPost.setAttribute('class', 'textPost'); 
 
            const pPostPattern = document.createElement('p');
  pPostPattern.setAttribute('id', 'boxbuilding');
  boxbuilding.innerHTML = 'Patrones en construcción ';
  containerMenuFeed.appendChild(boxbuilding);


  


  generalContainer.appendChild(containerMenuFeed);
  containerFeed.appendChild(generalContainer);
  return containerFeed;

}
