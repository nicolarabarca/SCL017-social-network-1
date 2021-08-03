import { firebaseConfig } from './firebConfig.js';
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();//  se  inicializa llamada a base de datos para agregar  post

let idEditPost = 0; // se declara la variable idEditPost (ideditPost) que  tendra el id del post que se quiere editar (cuando este ne un valor diferente a 0 significa que esta editando)

export const savePost = () => {
    const writePostValue = document.getElementById('writePost').value; // aqui se  obtiene  el valor del  texto que  hizo el usuario en el murp
    if (writePostValue ==""){
       /* const inputValidation = () =>{*/
         
                 
                 const myModal= document.createElement('div');
                 myModal.setAttribute('id', ',modalPost');
                 myModal.setAttribute('class','modal');
     
                 const modalContent = document.createElement('div');
                 modalContent.setAttribute('class','modal-content');
                 const pmodalContent= document.createElement('p');
                 pmodalContent.innerHTML= `escribe algo para postear`;
                 modalContent.style.display = "block";
     
                 myModal.appendChild(modalContent);
                 modalContent.appendChild(pmodalContent);

                 window.onclick = function(event) {
                     if (event.target == modalContent) {
                        modalContent.style.display = "none"; 

                     }
              /*  return inputValidation;  */  
               /*}*/
          
}
        } 
    const idUser = firebase.auth().currentUser;// obtener  el id del usuario que se encuentra usando firebase
    console.log(idEditPost);

    if (idEditPost == 0 ) { //  si es  igual a 0  el post se guarda como un post  nuevo
 
        db.collection('post').add({ // esta estructura es un json
            idUser: idUser.displayName, // son los datos que se guardan cuando se hace  un nuevo post 
            post: writePostValue,
            date: Date(),
            like: 0 // Se inicializan los like 

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
    db.collection('post').get().then((querySnapshot) => {// querySnapshot es el nombre de la variable que trae los post
        tablePost.innerHTML='';
        let arrayIdPost = Array(); // aqui se guardan los id de los post
        querySnapshot.forEach((doc) => { // aqui se recorren los registros del post
           
            arrayIdPost.push(doc.id); // aqui se guarda el id del array de los post
            const divPost= document.createElement('div');
            divPost.setAttribute('class', 'divPost');

            const textPost= document.createElement('div');
            textPost.setAttribute('class', 'textPost');   
            
            const pPost= document.createElement('p');
            pPost.innerHTML = ` ${doc.data().idUser} ${doc.data().post} ${doc.data().date}`;

            const divButtons= document.createElement('div');
            divButtons.setAttribute('id', 'buttons'+ doc.id);
            divButtons.setAttribute('class', 'buttons');               
            
            const textLike = document.createElement('textView');
            textLike.setAttribute('class', 'scoreLikes');
           
            textLike.innerHTML= doc.data().like; //  aca  se  llama  el  valor del contador del  like
                 
            
            const editButton = document.createElement('button');
            editButton.setAttribute('id', 'editButton');
            editButton.addEventListener('click', editPost); 
            editButton.idPost = doc.id;  //se asigna el id del post a una variable  para darselo a la funcion 
            editButton.post = doc.data().post; // aqui se le esta pasando el contenido del post
            
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', 'deleteButton');
            deleteButton.addEventListener('click', deletePost); 
            deleteButton.idPost = doc.id ;   //se asigna el id del post a una variable  para darselo a la funcion 

            if(doc.data().idUser==firebase.auth().currentUser.displayName){ // id user dice quien es el dueño del post y se compara  con currentuser para ver si corresponde el id con el usuario que esta logueado
                divButtons.appendChild(editButton);
                divButtons.appendChild(deleteButton);   // si entra aqui  solo el usuario dueño de los post puede ver los botones
            }
            
            
            textPost.appendChild(pPost);
            divButtons.appendChild(textLike);
            divPost.appendChild(divButtons);
            divPost.appendChild(textPost);
            tablePost.appendChild(divPost);
            

        });
        console.log(arrayIdPost.length); // 
        /*  este  trozo de  codigo  va a buscar  los like que  pertenecen al usuario a la base de  datos, 
        luego cada  like se empareja con el  post que  pertenece y a partir de esto si el  usuario dio like  
        se  pinta  como like  y si no lo dio se  pinta como  dislike*/

                let arrayIdLikes = Array();// aqui se guardan los id de post de los like
        db.collection('likes').get().then((querySnapshot) => {// aqui se consultan los like a la base de datos de firebase
            
            querySnapshot.forEach((doc) => { // aqui se recorre el resultado de la query
                if(doc.data().idUser==firebase.auth().currentUser.displayName){// aqui se pregunta si el like pertenece al usuario logueado
                    let divButtons= document.getElementById("buttons"+doc.data().idPost); // se concatena para que tengan un id unico
                    if(divButtons != null){ // cuando  es  nuevo se tiene  que saltar esto y  se dibuja en  la  parte  de abajo
                        const likeButton = document.createElement('button');
                        arrayIdLikes.push(doc.data().idPost); // aqui se  agrega el id del post al array
                        
                        likeButton.setAttribute('id', 'likeButton'+ doc.data().idPost);//  se concatena  para individualizar el boton con el id del post
                        likeButton.addEventListener('click', likePost);
                        console.log(doc.data().idPost);
                        likeButton.idPost = doc.data().idPost; // se  le  pasa el id del post
                        likeButton.idLike = doc.id; // aqui se  le  pasa  la  id del  like
                        if(doc.data().like == 0 ){ // aqui se  pregunta  si el usuario ya  le  habia  dado like 
                            likeButton.setAttribute('class', 'dislikeButton');
                        }else{
                            likeButton.setAttribute('class', 'likeButton');
                        }            
                        divButtons.appendChild(likeButton);
                    }
                }
            });
            /* aqui  se pone  por  defecto  dislike  todos  los  post  a  los  cuales  el usuario no les  ha dado  like ni dislike*/
            for(let idPost of arrayIdPost){   // aqui se  recorren los post con el id 
  
                let divButtons= document.getElementById("buttons"+idPost); // se  busca el div  donde  se  pondra el boton
     
                console.log(arrayIdLikes.includes(idPost));
                
                 
                if(!arrayIdLikes.includes(idPost)){ // aqui se  pregunta si el post no pertenece al  usuario se  pinta 
                    const likeButton = document.createElement('button'); // se  contruye  el  boton  de  like 
                
                    likeButton.setAttribute('id', 'likeButton'+ idPost);//  se concatena  para individualizar el boton con el id del post
                    likeButton.addEventListener('click', likePost); // aqui se  llama  la  funcion que se asocia al boton 
                   
                    likeButton.setAttribute('class', 'dislikeButton');// aqui se  le da  la clase de  dislike
                    likeButton.idPost = idPost; // se  le  pasa el id del post
                    likeButton.idLike = 0; // no existe ningun like de este usuario a este post
                    divButtons.appendChild(likeButton);
                }
    
            }            
        });   

        
    });
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
 
export const likePost = (evt) => {
    
    let likeButton = document.getElementById('likeButton' +  evt.currentTarget.idPost); // se  identifica el  boton like  
    console.log(evt.currentTarget.idPost);
    let idPostUpdate=evt.currentTarget.idPost;
    let likePost = 0;//  se quiere saber si el usuario  le esta dando like  o dislike 
    if(evt.currentTarget.idLike==0){ // aqui se  pregunta si el like  tiene  id (significa que  no existe en base de datos)
        
        if (likeButton.className == "dislikeButton"){ // siel valor es 1 quiere decir que el usuario le dio like
            likePost = 1;
        }  
        db.collection('likes').add({ // esta estructura es un json / se agrega el like a la base de datos
            idUser: firebase.auth().currentUser.displayName, // son los datos que se guardan cuando se hace  un nuevo post 
            idPost: evt.currentTarget.idPost,
            like: likePost 

        })
        .then((docRef) => { // aca es cuando el guardar  funciona  bien 
            console.log("Document written with ID: ", docRef.id);
            updatePostLike( idPostUpdate, likePost) //  se actualiza el valor del like 
            
        })
        .catch((error) => {  // esto s emuestra cuando hay un error en el guardar post
            console.error("Error adding document: ", error);
        });
    }else{ // aqui solo se debe actualizar el estado del like 
        likePost = 0;  // se  inicializa como si fuera un dislike
        if (likeButton.className == "dislikeButton"){ // si viene con dislike significa que es un like  y se  pone en 1 
            likePost = 1; 
        }  

        let updateEditLike = db.collection("likes").doc(evt.currentTarget.idLike);// aca se  busca el  documento a editar, se  usa la variale  que guarda el id del post
        let idPostUpdate=evt.currentTarget.idPost;

        updateEditLike.update({ // se setean los parametros de like y dislike
            like: likePost
        })
        .then(() => {
            console.log("Document successfully updated!");
            console.log(idPostUpdate);
            updatePostLike( idPostUpdate, likePost)// se actualiza la cantidad de likes que tiene el post

        })
        .catch((error) => { // aqui es cuando falla el editar el post 
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });



    }


 
   }


  function updatePostLike (idEditPost,like) { // contador de  likes 
    
    let updateEditPost = db.collection("post").doc(idEditPost);// aca se  busca el  documento a editar, se  usa la variale  que guarda el id del post
    let likeValue = -1; // aqui vamos a suponer que el usuario hara dislike entonces diminuiremos
    if(like == 1){
        likeValue=1;

     }   

     console.log(like);
     console.log(likeValue);
    updateEditPost.update({ // se  setean los parametros a editar 
       like: firebase.firestore.FieldValue.increment( likeValue)    // se  usa para incrementar o disminuir el valor de los like
    })
    .then(() => {
        console.log("Document successfully updated!");
        readPost();// se actualiza  la vista de  like 
                
    })
    .catch((error) => { // aqui es cuando falla el editar el post 
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}