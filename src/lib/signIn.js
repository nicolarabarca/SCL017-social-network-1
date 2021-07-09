export const signInFunction = () => {
  const rootIn = document.getElementById('rootSignIn');
  const headerIn = document.createElement('header');
  const titleIn = document.createElement('h1');
  titleIn.innerHTML = 'Tejer & Punto';
  headerIn.appendChild(titleIn);
  rootIn.appendChild(headerIn);
  const mainIn = document.createElement('main');
  const inputEmailIn = document.createElement('input');
  inputEmailIn.setAttribute('id', 'emailIn');
  inputEmailIn.setAttribute('type', 'email');
  inputEmailIn.setAttribute('placeholder', 'Correo electrónico');
  mainIn.appendChild(inputEmailIn);
  const inputPasswordIn = document.createElement('input');
  inputPasswordIn.setAttribute('id', 'passwordIn');
  inputPasswordIn.setAttribute('type', 'password');
  inputPasswordIn.setAttribute('placeholder', 'Contraseña');
  mainIn.appendChild(inputPasswordIn);
  const buttonLoginUser = document.createElement('button');
  buttonLoginUser.innerHTML = 'Inicia sesión';
  buttonLoginUser.setAttribute('id', 'buttonLoginUser');
  buttonLoginUser.addEventListener('click', () => {
    const emailIn = document.getElementById('emailIn').value;
    const passwordIn = document.getElementById('passwordIn').value;

    firebase.auth().signInWithEmailAndPassword(emailIn, passwordIn)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
  mainIn.appendChild(buttonLoginUser);
  rootIn.appendChild(mainIn);
};
