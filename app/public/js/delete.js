const delButtons = document.querySelectorAll('.delete');
const deleteModal = document.getElementById('deleteModal');
const modalForm = document.getElementById('modalForm');
const cancelDelete = document.querySelector('.cancel-delete');

delButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const form = button.closest('.delete-form');
        const action = form.getAttribute('action');
        
        modalForm.setAttribute('action', action);
        
        deleteModal.style.display = 'block'; // Exibe o modal quando o botão "Excluir" é clicado
    });
});

cancelDelete.addEventListener('click', () => {
    deleteModal.style.display = 'none'; // Esconde o modal quando "Cancelar" é clicado
});

window.addEventListener('click', (e) => {
    if (e.target == deleteModal) {
        deleteModal.style.display = 'none'; // Esconde o modal se o usuário clicar fora do modal
    }
});
