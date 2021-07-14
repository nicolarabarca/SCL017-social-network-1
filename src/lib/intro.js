export const introView = () => {
  const containerIntro = document.createElement('div');
  const buttonIntro = document.createElement('button');
  buttonIntro.setAttribute('id', 'btnIntro');
  buttonIntro.innerHTML = 'Comienza';
  buttonIntro.addEventListener('click', () => {
    window.location.href = '#/signup';
  });
  containerIntro.appendChild(buttonIntro);
  return containerIntro;
}