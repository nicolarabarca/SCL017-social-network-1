import { firebaseConfig } from './firebConfig.js';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
let idEditPost = 0;

export const savePost = () => {
  const writePostValue = document.getElementById('writePost').value;
  if (writePostValue === '') {
    const myModal = document.createElement('div');
    myModal.setAttribute('id', 'modalPost');
    myModal.setAttribute('class', 'modal');
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    const pmodalContent = document.createElement('p');
    pmodalContent.innerHTML = 'Escribe algo para postear';
    modalContent.style.display = 'block';
    myModal.appendChild(modalContent);
    modalContent.appendChild(pmodalContent);
    window.onclick = (event) => {
      if (event.target === modalContent) {
        modalContent.style.display = 'none';
      }
    };
  }
  const idUser = firebase.auth().currentUser;
  // console.log(idEditPost);
  if (idEditPost === 0) {
    db.collection('post').add({
      idUser: idUser.displayName,
      post: writePostValue,
      date: (new Date().toLocaleDateString('day', 'month', 'year')),
      like: 0,
    })
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
        document.getElementById('writePost').value = '';
        readPost();
      })
      .catch((error) => {
        // console.error('Error adding document: ', error);
      });
  } else {
    const updateEditPost = db.collection('post').doc(idEditPost);
    updateEditPost.update({
      post: writePostValue,
      date: (new Date().toLocaleDateString('day', 'month', 'year')),
    })
      .then(() => {
        // console.log('Document successfully updated!');
        document.getElementById('writePost').value = '';
        readPost();
        idEditPost = 0;
      })
      .catch((error) => {
        // console.error('Error updating document: ', error);
      });
  }
};

export const readPost = () => {
  const tablePost = document.getElementById('extraDiv');
  db.collection('post').get().then((querySnapshot) => {
    tablePost.innerHTML = '';
    const arrayIdPost = Array();
    querySnapshot.forEach((doc) => {
      arrayIdPost.push(doc.id);
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
    // console.log(arrayIdPost.length);
    const arrayIdLikes = Array();
    db.collection('likes').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().idUser === firebase.auth().currentUser.displayName) {
          const divButtons = document.getElementById('buttons' + doc.data().idPost);
          if (divButtons != null) {
            const likeButton = document.createElement('button');
            arrayIdLikes.push(doc.data().idPost);
            likeButton.setAttribute('id', 'likeButton' + doc.data().idPost);
            likeButton.addEventListener('click', likePost);
            // console.log(doc.data().idPost);
            likeButton.idPost = doc.data().idPost;
            likeButton.idLike = doc.id;
            if (doc.data().like === 0) {
              likeButton.setAttribute('class', 'dislikeButton');
            } else {
              likeButton.setAttribute('class', 'likeButton');
            }
            divButtons.appendChild(likeButton);
          }
        }
      });
      for (const idPost of arrayIdPost) {
        const divButtons = document.getElementById('buttons' + idPost);
        // console.log(arrayIdLikes.includes(idPost));
        if (!arrayIdLikes.includes(idPost)) {
          const likeButton = document.createElement('button');
          likeButton.setAttribute('id', 'likeButton' + idPost);
          likeButton.addEventListener('click', likePost);
          likeButton.setAttribute('class', 'dislikeButton');
          likeButton.idPost = idPost;
          likeButton.idLike = 0;
          divButtons.appendChild(likeButton);
        }
      }
    });
  });
};

const deletePost = (idDeletePost) => {
  // console.log(idDeletePost);
  db.collection('post').doc(idDeletePost).delete().then(() => {
    // console.log('Document successfully deleted!');
    document.getElementById('hideIdDeletePost').value = '';
    document.getElementById('containerModal').style.visibility = 'hidden';
    readPost();
  }).catch((error) => {
    // console.error('Error removing document: ', error);
  });
};

export const editPost = (evt) => {
  document.getElementById('writePost').value = evt.currentTarget.post;
  idEditPost = evt.currentTarget.idPost;
};

export const likePost = (evt) => {
  const likeButton = document.getElementById('likeButton' + evt.currentTarget.idPost);
  // console.log(evt.currentTarget.idPost);
  const idPostUpdate = evt.currentTarget.idPost;
  let likePost = 0;
  if (evt.currentTarget.idLike === 0) {
    if (likeButton.className === 'dislikeButton') {
      likePost = 1;
    }
    db.collection('likes').add({
      idUser: firebase.auth().currentUser.displayName,
      idPost: evt.currentTarget.idPost,
      like: likePost,
    })
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
        updatePostLike(idPostUpdate, likePost);
      })
      .catch((error) => {
        // console.error('Error adding document: ', error);
      });
  } else {
    likePost = 0;
    if (likeButton.className === 'dislikeButton') {
      likePost = 1;
    }
    const updateEditLike = db.collection('likes').doc(evt.currentTarget.idLike);
    const idPostUpdate = evt.currentTarget.idPost;
    updateEditLike.update({
      like: likePost,
    })
      .then(() => {
        // console.log('Document successfully updated!');
        // console.log(idPostUpdate);
        updatePostLike(idPostUpdate, likePost);
      })
      .catch((error) => {
        // console.error('Error updating document: ', error);
      });
  }
};

const updatePostLike = (idEditPost, like) => {
  const updateEditPost = db.collection('post').doc(idEditPost);
  let likeValue = -1;
  if (like === 1) {
    likeValue = 1;
  }
  // console.log(like);
  // console.log(likeValue);
  updateEditPost.update({
    like: firebase.firestore.FieldValue.increment(likeValue),
  })
    .then(() => {
      // console.log('Document successfully updated!');
      readPost();
    })
    .catch((error) => {
      // console.error('Error updating document: ', error);
    });
};

export const confirmDeletePost = () => {
  deletePost(document.getElementById('hideIdDeletePost').value);
};

export const noConfirmDeletePost = () => {
  document.getElementById('containerModal').style.visibility = 'hidden';
};

export const askConfirmDeletePost = (evt) => {
  document.getElementById('hideIdDeletePost').value = evt.currentTarget.idPost;
  document.getElementById('containerModal').style.visibility = 'visible';
};
