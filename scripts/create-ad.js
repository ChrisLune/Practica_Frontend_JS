document.addEventListener('DOMContentLoaded', () => {
    const createAdForm = document.getElementById('create-ad-form');
    const backBtn = document.getElementById('back-btn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    createAdForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(createAdForm);
        const adData = {
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            type: formData.get('type'),
            userId: getUserId()
        };

        if (formData.get('image')) {
            uploadImage(formData.get('image'))
                .then(imageUrl => {
                    adData.image = imageUrl;
                    createAd(adData);
                })
                .catch(error => {
                    alert('Error al subir la imagen');
                });
        } else {
            createAd(adData);
        }
    });

    function uploadImage(imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        return fetch('http://127.0.0.1:8000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => data.url);
    }

    function createAd(adData) {
        fetch('http://127.0.0.1:8000/api/ads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(adData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Anuncio creado correctamente');
            window.location.href = 'index.html';
        })
        .catch(error => {
            alert('Error al crear el anuncio');
        });
    }
});
