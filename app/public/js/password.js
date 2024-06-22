const togglePasswords = document.querySelectorAll("#togglePassword");

togglePasswords.forEach(function(togglePassword) {
    togglePassword.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling;
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;

        // Alterna entre os ícones de olho
        this.classList.toggle("fa-eye-slash");
        this.classList.toggle("fa-eye");
    });
});