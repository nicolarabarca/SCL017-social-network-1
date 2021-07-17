export const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let uid = user.uid;
      console.log('Existe usuario activo');
    } else {
      console.log('No existe usuario activo');
    }
  });  
}
