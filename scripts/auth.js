document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const backBtn = document.getElementById('back-btn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const loginData = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                alert('Login exitoso');
                window.location.href = 'index.html';
            } else {
                alert('Credenciales incorrectas');
            }
        })
        .catch(error => {
            alert('Error al iniciar sesión');
        });
    });
});

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
                alert('Error al registrar');
            }
        })
        .catch(error => {
            alert('Error al registrar');
        });
    });
});
