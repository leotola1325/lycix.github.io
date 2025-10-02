document.getElementById('password').addEventListener('input', function() {
    var password = this.value;
    var confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
        document.getElementById('password-error').textContent = 'As senhas não coincidem.';
    } else {
        document.getElementById('password-error').textContent = '';
    }
});

document.getElementById('confirm-password').addEventListener('input', function() {
    var password = document.getElementById('password').value;
    var confirmPassword = this.value;
    if (password !== confirmPassword) {
        document.getElementById('password-error').textContent = 'As senhas não coincidem.';
    } else {
        document.getElementById('password-error').textContent = '';
    }
});