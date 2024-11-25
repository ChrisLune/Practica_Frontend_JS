document.addEventListener('DOMContentLoaded', () => {
    const adDetail = document.getElementById('ad-detail');
    const backBtn = document.getElementById('back-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const adId = urlParams.get('id');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function loadAdDetail() {
        fetch(`http://127.0.0.1:8000/api/ads/${adId}`)
            .then(response => response.json())
            .then(ad => {
                adDetail.innerHTML = `
                    <img src="${ad.image}" alt="${ad.title}">
                    <h2>${ad.title}</h2>
                    <p>${ad.description}</p>
                    <p>Precio: ${ad.price} €</p>
                    <p>Tipo: ${ad.type}</p>
                    <button id="delete-ad-btn" style="display:none;">Eliminar Anuncio</button>
                `;

                const deleteAdBtn = document.getElementById('delete-ad-btn');
                if (isUserAuthenticated() && ad.userId === getUserId()) {
                    deleteAdBtn.style.display = 'block';
                    deleteAdBtn.addEventListener('click', () => {
                        if (confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
                            deleteAd(adId);
                        }
                    });
                }
            })
            .catch(error => {
                adDetail.innerHTML = '<p>Error al cargar el anuncio. Mostrando anuncio de ejemplo:</p>';
                showExampleAdDetail();
            });
    }

    function showExampleAdDetail() {
        const exampleAd = {
            id: 0,
            title: "Producto de Ejemplo (Reloj)",
            description: "Reloj Fossil de piel.",
            price: 50,
            type: "venta",
            image: "https://via.assets.so/watch.png?id=1&q=95&w=250&h=250&fit=fill"
        };

        adDetail.innerHTML = `
            <img src="${exampleAd.image}" alt="${exampleAd.title}">
            <h2>${exampleAd.title}</h2>
            <p>${exampleAd.description}</p>
            <p>Precio: ${exampleAd.price} €</p>
            <p>Tipo: ${exampleAd.type}</p>
        `;
    }

    function deleteAd(adId) {
        fetch(`http://127.0.0.1:8000/api/ads/${adId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        .then(response => response.json())
        .then(data => {
            alert('Anuncio eliminado correctamente');
            window.location.href = 'index.html';
        })
        .catch(error => {
            alert('Error al eliminar el anuncio');
        });
    }

    loadAdDetail();
});
