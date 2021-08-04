export const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      console.log('Existe usuario activo');
    } else {
      window.location.href = '#/intro';
      console.log('No existe usuario activo');
    }
  });
};
