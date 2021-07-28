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
    const tablePost = document.getElementById('extraDiv'); // aqui se  llama al tr donde se  insertan los post
    db.collection('post').get().then((querySnapshot) => {
        tablePost.innerHTML='';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().post}`);
        tablePost.innerHTML += `
        <div class = "divPost">
        <div class = "textPost">
       <p> ${doc.data().idUser} ${doc.data().post} ${doc.data().date} </p>
       </div>
        <div id = "buttons">
        <button id="likeButton" onclick= "likeButton( '${doc.id}')" ></button>
        
        <button id="dislikeButton"  onclick= "likeButton( '${doc.id}')"></button>
        <TextView id="textView" "> nlikes</textView>
        
        <button id="edit-button" class = "editButton" onclick= editPost( '${doc.id}')"></button> 
       
       </div>

       </div>

            `;   
        });
    });
}

const likePost = (idPost) => {
   // FirebaseDatabase database = FirebaseDatabase.getInstance();
   
    console.log(idPost);
    
  }

//const deleteButtonfunction=document.querySelector('#delete-button');
//deleteButtonfunction.addEventListener('click', deletePost('${doc.id}'), 'false');
 
export const deletePost = (id) => {
    db.collection('posts').doc('${doc.id}').delete('${doc.id}').then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
          console.error("Error removing document: ", error);
        });
 }
