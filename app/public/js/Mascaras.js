// cpf 
const cpfInput = document.querySelector('.cpf');

cpfInput.addEventListener('input', function () {
    let value = cpfInput.value.replace(/\D/g, '');
    if (value.length > 9) {
        value = value.substring(0, 9) + '-' + value.substring(9, 11);
    }
    if (value.length > 3) {
        value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '.' + value.substring(7);
    }
    cpfInput.value = value;
});