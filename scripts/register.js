document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const backBtn = document.getElementById('back-btn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const registerData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso');
                window.location.href = 'login.html';
            } else {
                alert('Error al registrar: ' + data.message);
            }
        })
        .catch(error => {
            alert('Error al registrar');
        });
    });
});
