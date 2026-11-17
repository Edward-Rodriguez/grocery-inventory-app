const deleteDialog = document.querySelector('#delete-dialog');
const saveDialog = document.querySelector('#save-dialog');
const saveAdminPassword = document.querySelector('#saveAdminPassword');
const cancelButton = document.querySelector('#save-dialog .dialog-cancel-btn');
const saveButton = document.querySelector('#submit-edit-btn');

saveAdminPassword.disabled = true;

if (deleteDialog.dataset.autoOpen === 'true') {
  deleteDialog.showModal();
} else if (saveDialog.dataset.autoOpen === 'true') {
  saveAdminPassword.disabled = false;
  saveDialog.showModal();
}

cancelButton.addEventListener('click', () => {
  saveButton.setAttribute('type', 'submit');
});
