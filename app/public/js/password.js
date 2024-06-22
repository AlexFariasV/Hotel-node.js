const togglePasswords = document.querySelectorAll("#togglePassword");

togglePasswords.forEach(function(togglePassword) {
    togglePassword.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling;

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            passwordInput.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
    });
});