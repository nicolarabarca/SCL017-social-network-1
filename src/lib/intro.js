export const introView = () => {
  const containerIntro = document.createElement('div');
  const divGif = document.createElement('div');
  divGif.setAttribute('id', 'divGif');
  containerIntro.appendChild(divGif);
  const divTextIntro = document.createElement('div');
  divTextIntro.setAttribute('id', 'divTextIntro');
  divTextIntro.innerHTML = '<strong>Conecta con tejedoras de todo el mundo</strong>';
  containerIntro.appendChild(divTextIntro);
  const divButtonIntro = document.createElement('div');
  divButtonIntro.setAttribute('id', 'divButtonIntro');
  const buttonIntro= document.createElement('button');
  buttonIntro.setAttribute('id', 'buttonIntro');
  buttonIntro.innerHTML = '<strong>Comenzar</strong>';
  buttonIntro.addEventListener('click', () => {
    window.location.href = '#/signup';
  })
  divButtonIntro.appendChild(buttonIntro);
  containerIntro.appendChild(divButtonIntro);
  const footerIntro = document.createElement('footer');
  footerIntro.innerHTML = 'Derechos reservados Tejer&Punto';
  footerIntro.setAttribute('id', 'footerIntro');
  containerIntro.appendChild(footerIntro);
  return containerIntro;
}