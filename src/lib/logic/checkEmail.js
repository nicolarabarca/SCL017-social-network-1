export const checkEmailValidity = () => {
  const emails = document.getElementsByClassName('emails')[0];
  if (emails.validity.typeMismatch) {
    emails.setCustomValidity('Debes ingresar un email válido');
    emails.style.border = '2px dashed #FF0000';
  } else {
    emails.setCustomValidity('');
  }  
}
