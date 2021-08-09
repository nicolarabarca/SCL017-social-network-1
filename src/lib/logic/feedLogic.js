import { firebaseConfig } from './firebConfig.js';

firebase.initializeApp(firebaseConfig);// inicializar la base de datos a firebases

const db = firebase.firestore(); // se  inciia  conexion
let idEditPost = 0; // se  declara para identificar una edicion de un post  neuvo

export const savePost = () => {
  const writePostValue = document.getElementById('writePost').value;
  if (writePostValue === '') {
    document.getElementById('containerModalInput').style.visibility = 'visible';
  } else {
    const idUser = firebase.auth().currentUser;
    //console.log(idEditPost);
    if (idEditPost === 0) {
    db.collection('post').add({
		  idUser: idUser.displayName,
		  post: writePostValue,
		  date: (new Date().toLocaleDateString('day', 'month', 'year')),
		  like: 0,
		})
		 .then((docRef) => {
			console.log('Document written with ID: ', docRef.id);
			document.getElementById('writePost').value = '';
			readPost();
		  })
		  .catch((error) => {
			console.error('Error adding document: ', error);
		  });
	  } else {
		const updateEditPost = db.collection('post').doc(idEditPost);
		updateEditPost.update({
		  post: writePostValue,
		  date: (new Date().toLocaleDateString('day', 'month , year')),
		})
		  .then(() => {
			console.log('Document successfully updated!');
			document.getElementById('writePost').value = '';
			readPost();
			idEditPost = 0;
		  })
		  .catch((error) => {
			console.error('Error updating document: ', error);
		  });
	  }
  }
};

export const readPost = () => {   // se  leen  los post de firebase  y se pintan en pantalla
  const tablePost = document.getElementById('extraDiv'); //variable 
  db.collection('post').get().then((querySnapshot) => { // aqui se  guarda el resultado
    tablePost.innerHTML = '';// se  incializan los  post
    const arrayIdPost = Array(); // aqui se guardan los id de los post
    querySnapshot.forEach((doc) => { // aqui se recorren los registros del post
      arrayIdPost.push(doc.id); // aqui se guarda el id del array de los post
      const divPost = document.createElement('div');
      divPost.setAttribute('class', 'divPost');
      const textPost = document.createElement('div');
      textPost.setAttribute('class', 'textPost');
      const pPost = document.createElement('p');
      pPost.innerHTML = ` ${doc.data().idUser} ${doc.data().post} ${doc.data().date}`;
      const divButtons = document.createElement('div');
      divButtons.setAttribute('id', 'buttons' + doc.id);
      divButtons.setAttribute('class', 'buttons');
      const textLike = document.createElement('textView');
      textLike.setAttribute('class', 'scoreLikes');
      textLike.innerHTML = doc.data().like;
      const editButton = document.createElement('button');
      editButton.setAttribute('id', 'editButton');
      editButton.addEventListener('click', editPost);
      editButton.idPost = doc.id;
      editButton.post = doc.data().post;
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', 'deleteButton');
      deleteButton.addEventListener('click', askConfirmDeletePost);
      deleteButton.idPost = doc.id;
      if (doc.data().idUser === firebase.auth().currentUser.displayName) {
        divButtons.appendChild(editButton);
        divButtons.appendChild(deleteButton);
      }
      textPost.appendChild(pPost);
      divButtons.appendChild(textLike);
      divPost.appendChild(divButtons);
      divPost.appendChild(textPost);
      tablePost.appendChild(divPost);
    });
    console.log(arrayIdPost.length);
    // este  trozo de  codigo  va a buscar  los like que  pertenecen al usuario a la base de  datos,
    // luego cada  like se empareja con el  post que  pertenece y a partir de esto si el  usuario dio like
    // se  pinta  como like  y si no lo dio se  pinta como  dislike.
    //
    const arrayIdLikes = Array(); // aqui se guardan los id de post de los like
    db.collection('likes').get().then((querySnapshot) => { // aqui se consultan los like a la base de datos de firebase
      querySnapshot.forEach((doc) => { // aqui se recorre el resultado de la query
        if (doc.data().idUser === firebase.auth().currentUser.displayName) {
          const divButtons = document.getElementById('buttons' + doc.data().idPost); // se concatena para que tengan un id unico
          if (divButtons != null) {
            const likeButton = document.createElement('button');
            arrayIdLikes.push(doc.data().idPost); // aqui se  agrega el id del post al array
            likeButton.setAttribute('id', 'likeButton' + doc.data().idPost); // se concatena  para individualizar el boton con el id del post
            likeButton.addEventListener('click', likePost);
            console.log(doc.data().idPost);
            likeButton.idPost = doc.data().idPost; // se  le  pasa el id del post
            likeButton.idLike = doc.id; // aqui se  le  pasa  la  id del  like
            if (doc.data().like === 0) { // aqui se  pregunta  si el usuario ya le habia dado like
              likeButton.setAttribute('class', 'dislikeButton');
            } else {
              likeButton.setAttribute('class', 'likeButton');
            }
            divButtons.appendChild(likeButton);
          }
        }
      });
      // aqui se pone por defecto dislike todos los post a los cuales el usuario no les ha dado like ni dislike
      for (const idPost of arrayIdPost) { // aqui se  recorren los post con el id
        const divButtons = document.getElementById('buttons' + idPost); // se  busca el div  donde  se  pondra el boton
        console.log(arrayIdLikes.includes(idPost));
        if (!arrayIdLikes.includes(idPost)) { // aqui se  pregunta si el post no pertenece al  usuario se  pinta
          if (divButtons != null) {
          const likeButton = document.createElement('button'); // se  contruye  el  boton  de  like
          likeButton.setAttribute('id', 'likeButton' + idPost); // se concatena  para individualizar el boton con el id del post
          likeButton.addEventListener('click', likePost); // aqui se  llama  la  funcion que se asocia al boton
          likeButton.setAttribute('class', 'dislikeButton'); // aqui se le da la clase de dislike
          likeButton.idPost = idPost; // se  le  pasa el id del post
          likeButton.idLike = 0; // no existe ningun like de este usuario a este post
          divButtons.appendChild(likeButton);
        }
      }
      }
    }); 
  });
};

function deletePost(idDeletePost) { // se  transforma en  funcion para pasar parametro
  console.log(idDeletePost); // se lee la id del elemento a eliminar 
  
  db.collection('post').doc(idDeletePost).delete().then(() => {  // se pone la id del post
      console.log("Document successfully deleted!");
  document.getElementById('hideIdDeletePost').value = '';// se reinicia todo
      document.getElementById('containerModal').style.visibility = "hidden";
      readPost();// se pone readpost para refrescar la vista
  }).catch((error) => {
        console.error("Error removing document: ", error);
      });

      
}

export const editPost = (evt) => {
  document.getElementById('writePost').value = evt.currentTarget.post;
  idEditPost = evt.currentTarget.idPost;
};

export const likePost = (evt) => {
  const likeButton = document.getElementById('likeButton' + evt.currentTarget.idPost); // se identifica el boton like
  console.log(evt.currentTarget.idPost);
  const idPostUpdate = evt.currentTarget.idPost;
  let likePost = 0; // se quiere saber si el usuario  le esta dando like  o dislike
  if (evt.currentTarget.idLike === 0) { // aqui se pregunta si el like  tiene id
    if (likeButton.className === 'dislikeButton') { // si el valor es 1 quiere decir que el usuario le dio like
      likePost = 1;
    }
    db.collection('likes').add({ // esta estructura es un json / se agrega el like a la base de datos
      idUser: firebase.auth().currentUser.displayName,
      idPost: evt.currentTarget.idPost,
      like: likePost,
    })
      .then((docRef) => { // aca es cuando el guardar  funciona  bien
        console.log('Document written with ID: ', docRef.id);
        updatePostLike(idPostUpdate, likePost); // se actualiza el valor del like
      })
      .catch((error) => { // esto s emuestra cuando hay un error en el guardar post
        console.error('Error adding document: ', error);
      });
  } else { // aqui solo se debe actualizar el estado del like
    likePost = 0; // se  inicializa como si fuera un dislike
    if (likeButton.className === 'dislikeButton') { // si viene con dislike significa que es un like  y se  pone en 1
      likePost = 1;
    }
    const updateEditLike = db.collection('likes').doc(evt.currentTarget.idLike); // aca se busca el documento a editar, se  usa la variale  que guarda el id del post
    const idPostUpdate = evt.currentTarget.idPost;
    updateEditLike.update({ // se setean los parametros de like y dislike
      like: likePost,
    })
      .then(() => {
        console.log('Document successfully updated!');
        console.log(idPostUpdate);
        updatePostLike(idPostUpdate, likePost);
      })
      .catch((error) => { // aqui es cuando falla el editar el post
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  }
};

const updatePostLike = (idEditPost, like) => { // contador de  likes
  const updateEditPost = db.collection('post').doc(idEditPost); // aca se  busca el  documento a editar, se  usa la variale  que guarda el id del post
  let likeValue = -1; // aqui vamos a suponer que el usuario hara dislike entonces diminuiremos
  if (like === 1) {
    likeValue = 1;
  }
  console.log(like);
  console.log(likeValue);
  updateEditPost.update({
    like: firebase.firestore.FieldValue.increment(likeValue),
  })
    .then(() => {
      console.log('Document successfully updated!');
      readPost();
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

export const confirmDeletePost = (evt) => {// se asocia al boton eliminar  del modal
	
	deletePost(document.getElementById('hideIdDeletePost').value);//se  guarda  el valor  del id en el input que se esconde

        
 }
 
export const noConfirmDeletePost = (evt) => {
	//Usuario no confirma eliminacion, se esconde el modal
	document.getElementById('containerModal').style.visibility = "hidden";
        
 }
 export const askConfirmDeletePost = (evt) => {
	//Usuario no confirma eliminacion, se esconde el modal
	document.getElementById('hideIdDeletePost').value = evt.currentTarget.idPost;
	document.getElementById('containerModal').style.visibility = "visible";
        
 }
 export const closeInputModal = (evt) => {
	//Usuario no confirma eliminacion, se esconde el modal
	document.getElementById('containerModalInput').style.visibility = "hidden";
        
 }
