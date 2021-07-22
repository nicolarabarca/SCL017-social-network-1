export const signOutUser = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log('saliendo');
    window.location.href = '#/intro';
  }).catch((error) => {
    // An error happened.
    console.log('error');
  });
};
