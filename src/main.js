import { firebaseConfig } from './lib/logic/firebConfig.js';
import { observer } from './lib/logic/observerFB.js';
import { init } from './lib/router.js';



firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();//  se  inicializa llamada a base de datos para agregar  post
observer();
window.addEventListener('load', init);



export const savePost = () => {
    const writePostValue = document.getElementById('writePost').value; // aqui se  obtiene  el valor del  texto que  hizo el usuario en el murp
    const idUser = firebase.auth().currentUser;// obtener  el id del usuario que se encuentra usando firebase
    console.log(idUser);
    db.collection('post').add({
        idUser: idUser.displayName, //se agrega  el email del usuario  para conseguir  el id del usuario
        post: writePostValue,
        date: (new Date())
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('writePost').value = ''; // esto es para limpiar el campo donde se escriben los post
        readPost(); // aqui se refresca la grilla y se agregan los nuevos post
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

  // readPost
  export const readPost = () => {
    const tablePost = document.getElementById('tablePost'); // aqui se  llama al tr donde se  insertan los post
    db.collection('post').get().then((querySnapshot) => {
        tablePost.innerHTML='';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().post}`);
        tablePost.innerHTML += `
        <tr>
        <td>${doc.data().idUser} ${doc.data().post} ${doc.data().date}</td>

        <td>  <button id='deleteButton' onclick= editPost( '${doc.id}')"> Editar</button> 
        <button onclick= "deletePost( '${doc.idUser}')"> Borrar</button></td>

        

        </tr>
        `;   
        });
    });
}


export const deletePost = (idPost) => {

    console.log(idPost);
    
  }