const Post = () => {

  const divPost = document.createElement('div');
  divPost.setAttribute('id', 'containerFeed');

  const textPost=document.createElement('div');
  textPost.setAttribute('id', 'generalContainer');
  const Parrafo= document.createElement('p');
  Parrafo.innerHTML= '${doc.data().idUser} ${doc.data().post} ${doc.data().date}';
  parrafo.setAttribute('id', 'extraDiv');
  textPost.appendChild(parrafo);
  divPost.appendChild(textPost);



  const buttonTest = document.createElement('button');
  buttonTest.innerHTML = 'borrar';
  buttonTest.setAttribute('id', 'deletebutton');
  buttonTest.addEventListener('click', deletePost);
  divPost.appendChild(buttonTest);

  
  
  return divPost;
}
