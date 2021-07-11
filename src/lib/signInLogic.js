export const loginUser = () => {
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
};
