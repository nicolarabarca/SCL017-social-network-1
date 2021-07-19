import { createUser } from './signUpLogic.js';
import { googleAccess } from './googleSignIn.js';

export const signUpView = () => {
  const containerUp = document.createElement('div');
  containerUp.setAttribute('id', 'containerUp');
  const headerUp = document.createElement('header');
  const titleUp = document.createElement('h1');
  titleUp.setAttribute('id', 'titleUp');
  titleUp.innerHTML = 'Tejer & Punto';
  headerUp.appendChild(titleUp);
  containerUp.appendChild(headerUp);
  const mainUp = document.createElement('main');
  const formUp = document.createElement('form');
  const inputEmailUp = document.createElement('input');
  inputEmailUp.setAttribute('id', 'emailUp');
  inputEmailUp.setAttribute('type', 'email');
  inputEmailUp.setAttribute('placeholder', 'Correo electrónico');
  inputEmailUp.addEventListener('input', () => {
    if (inputEmailUp.validity.typeMismatch) {
      inputEmailUp.setCustomValidity('Debes ingresar un email válido');
      inputEmailUp.style.border = '2px dashed #FF0000';
    } else {
      inputEmailUp.setCustomValidity('');
    }
  });
  formUp.appendChild(inputEmailUp);
  const inputPasswordUp = document.createElement('input');
  inputPasswordUp.setAttribute('id', 'passwordUp');
  inputPasswordUp.setAttribute('type', 'password');
  inputPasswordUp.setAttribute('placeholder', 'Contraseña');
  formUp.appendChild(inputPasswordUp);
  const buttonCreateUser = document.createElement('button');
  buttonCreateUser.innerHTML = 'Regístrate';
  buttonCreateUser.setAttribute('id', 'buttonCreateUser');
  buttonCreateUser.addEventListener('click', createUser);
  formUp.appendChild(buttonCreateUser);
  mainUp.appendChild(formUp);
  const termsText = document.createElement('p');
  termsText.innerHTML = 'Al registrarte, aceptas las <a href="">Condiciones</a> de Tejer & Punto.';
  termsText.setAttribute('id', 'termsText');
  mainUp.appendChild(termsText);
  const sendToSignInText = document.createElement('p');
  sendToSignInText.setAttribute('id', 'sendToSignInText');
  sendToSignInText.innerHTML = '¿Ya tienes una cuenta? <a href="#/signin">Inicia sesión</a>.';
  mainUp.appendChild(sendToSignInText);
  const separationTextUp = document.createElement('p');
  separationTextUp.setAttribute('id', 'separationTextUp');
  separationTextUp.innerHTML = '- o -';
  mainUp.appendChild(separationTextUp);
  const buttonToGoogleUp = document.createElement('button');
  buttonToGoogleUp.innerHTML = 'Ingresa con Google';
  buttonToGoogleUp.setAttribute('id', 'buttonToGoogleUp');
  buttonToGoogleUp.addEventListener('click', googleAccess);
  mainUp.appendChild(buttonToGoogleUp);
  containerUp.appendChild(mainUp);
  const footerUp = document.createElement('footer');
  footerUp.setAttribute('id', 'footerUp');
  footerUp.innerHTML = 'Derechos reservados @Tejer&Punto';
  containerUp.appendChild(footerUp);
  return containerUp;
};
