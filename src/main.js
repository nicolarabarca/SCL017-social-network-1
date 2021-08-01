 import { firebaseConfig } from './lib/logic/firebConfig.js';
import { observer } from './lib/logic/observerFB.js';
import { init } from './lib/router.js';



firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();//  se  inicializa llamada a base de datos para agregar  post
observer();
window.addEventListener('load', init);
let idEditPost = 0; // se declara la variable idEditPost (ideditPost) que  tendra el id del post que se quiere editar (cuando este ne un valor diferente a 0 significa que esta editando)

export const savePost = () => {
    const writePostValue = document.getElementById('writePost').value; // aqui se  obtiene  el valor del  texto que  hizo el usuario en el murp
    const idUser = firebase.auth().currentUser;// obtener  el id del usuario que se encuentra usando firebase
    console.log(idEditPost);

    if (idEditPost == 0 ) { //  si es  igual a 0  el post se guarda como un post  nuevo
 
        db.collection('post').add({
            idUser: idUser.displayName, // son los datos que se guardan cuando se hace  un nuevo post 
            post: writePostValue,
            date: (new Date())
        })
        .then((docRef) => { // acaes cuando el guardar  funciona  bien 
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('writePost').value = ''; // esto es para limpiar el campo donde se escriben los post
            readPost(); // aqui se refresca la grilla y se agregan los nuevos post
            
        })
        .catch((error) => {  // esto s emuestra cuando hay un error en el guardar post
            console.error("Error adding document: ", error);
        });        
        
       
     } else {  // aqui se guarda el post editado 

        let updateEditPost = db.collection("post").doc(idEditPost);// aca se  busca el  documento a editar, se  usa la variale  que guarda el id del post
        
        updateEditPost.update({ // se  setean los parametros a editar 
            post: writePostValue,
            date: (new Date())
        })
        .then(() => {
            console.log("Document successfully updated!");
            document.getElementById('writePost').value = ''; // esto es para limpiar el campo donde se escriben los post
            readPost(); // aqui se refresca la grilla y se agregan los nuevos post
            idEditPost = 0;  // se  reinicia el post  para  recibir   otra edicion          
        })
        .catch((error) => { // aqui es cuando falla el editar el post 
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

       
     }

  }

  // readPost
  export const readPost = () => {
    
    const tablePost = document.getElementById('extraDiv'); // aqui se  llama al tr donde se  insertan los post
    db.collection('post').get().then((querySnapshot) => {
        tablePost.innerHTML='';
        querySnapshot.forEach((doc) => {
           
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
            
            const editButton = document.createElement('button');
            editButton.setAttribute('id', 'editButton');
            editButton.addEventListener('click', editPost); 
            editButton.idPost = doc.id;  //se asigna el id del post a una variable  para darselo a la funcion 
            editButton.post = doc.data().post; // aqui se le esta pasando el contenido del post
            
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', 'deleteButton');
            deleteButton.addEventListener('click', deletePost); 
            deleteButton.idPost = doc.id ;   //se asigna el id del post a una variable  para darselo a la funcion 


            divButtons.appendChild(likeButton);
            divButtons.appendChild(dislikeButton);
            divButtons.appendChild(editButton);
            divButtons.appendChild(deleteButton);

            textPost.appendChild(pPost);

            divPost.appendChild(divButtons);
            divPost.appendChild(textPost);

            tablePost.appendChild(divPost);
            

        });
    });
}

export const likePost = (idPost) => {
   // FirebaseDatabase database = FirebaseDatabase.getInstance();
   
    
  }

 
export const deletePost = (evt) => {
    console.log(evt.currentTarget.idPost); // se lee la id del elemento a eliminar 
    
    db.collection('post').doc(evt.currentTarget.idPost).delete().then(() => {  // se pone la id del post
        console.log("Document successfully deleted!");
        readPost();// se pone readpost para refrescar la vista
    }).catch((error) => {
          console.error("Error removing document: ", error);
        });

        
 }

 export const editPost = (evt) => {
    document.getElementById('writePost').value = evt.currentTarget.post; // se le asigna a la caja de  post el  texto del  post que se editara
    idEditPost =  evt.currentTarget.idPost; //  a la  variable ideditpost se le asigna el id del post que se va a editar

     
   }
 