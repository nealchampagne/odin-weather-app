import { clearChildren } from "./clearchildren";
import { homeLoad } from "./homeload";

// Display caught errors to the user outside of devtools
export const handleError = (err) => {
  console.error(err);

  const content = document.getElementById('content');

  const modal = document.createElement('div');
  const close = document.createElement('button');
  const errorMessage = document.createElement('div');

  clearChildren(content);

  modal.classList.add('errormodal');
  close.classList.add('closeerror');
  errorMessage.classList.add('errormessage');

  close.textContent = 'Back';
  errorMessage.textContent = err;

  content.appendChild(modal);
  modal.appendChild(errorMessage);
  modal.appendChild(close);

  // Take user back to the search page after closing the error modal
  close.addEventListener('click', () => {
    modal.remove();
    homeLoad();
  });
};