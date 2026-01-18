// import { initSubmitForm } from './submit.js';

// import initSubmitForm from './submit.js';

// const iframe = document.getElementById('formFrame');

// iframe.addEventListener('load', () => {
//   onFormSent();
// });

initSubmitForm("#myForm", "#modal2");


document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById('formFrame');
  if (iframe) {
    iframe.addEventListener('load', () => {
      onFormSent();
    });
  }
});
