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
        date: (Date())
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

            const divPost= document.createElement('div');
            divPost.setAttribute('class', 'divPost');

            const textPost= document.createElement('div');
            textPost.setAttribute('class', 'textPost');   
            
            const pPost= document.createElement('p');
            pPost.innerHTML = ` ${doc.data().idUser} ${doc.data().post} ${doc.data().date}`;

            const divButtons= document.createElement('div');
            divButtons.setAttribute('id', 'buttons');               
            
            
            const likeButton = document.createElement('button');
            likeButton.setAttribute('id', 'likeButton');
            likeButton.addEventListener('click', likePost(`${doc.id}`));

            const dislikeButton = document.createElement('button');
            dislikeButton.setAttribute('id', 'dislikeButton');
            dislikeButton.addEventListener('click', likePost(`${doc.id}`));         
            
            const edit_button = document.createElement('button');
            edit_button.setAttribute('id', 'edit-button');
            edit_button.addEventListener('click', editPost); 
            edit_button.idPost = doc.id /* doc.data().idUser, doc.data().post, doc.data().date; *///editar post y no estamos segira de esto

            const delete_button = document.createElement('button');
            delete_button.setAttribute('id', 'delete-button');
            delete_button.addEventListener('click', deletePost); 
            delete_button.idPost = doc.id ;   //se asigna el id del post a una variable  para darselo a la funcion 


            divButtons.appendChild(likeButton);
            divButtons.appendChild(dislikeButton);
            divButtons.appendChild(edit_button);
            divButtons.appendChild(delete_button);

            textPost.appendChild(pPost);

            divPost.appendChild(divButtons);
            divPost.appendChild(textPost);

            tablePost.appendChild(divPost);
            
        });
    });
}

export const likePost = (idPost) => {
   // FirebaseDatabase database = FirebaseDatabase.getInstance();
   
    console.log(idPost);
    
  }
 
 export const deletePost = (evt) => {
    console.log(evt.currentTarget.idPost); // se lee la id del elemento a eliminar 
    
    db.collection('post').doc(evt.currentTarget.idPost).delete().then(() => {  // se pone la id del post a eliminar
        console.log('Document successfully deleted!');
        readPost();// se pone readpost para refrescar la vista
    }).catch((error) => {
          console.error('Error removing document: ', error);
        });
    }
// Editar post 
 export const editPost = (evnt)=>{
     /*document.getElementById('writePost').value = doc.data().idUser;*/
    const editPost2 = db.collection('post').doc(evnt.currentTarget.idPost); //probando 
   /* console.log('id' + id);*/
// Set the "capital" field of the city 'DC'
return editPost2.update({
    idUser: idUser.displayName, 
    post: writePostValue,
    date: (new Date())
})
.then(() => {
    console.log("Document successfully updated!");
    readPost();
})
.catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
 }


