document.addEventListener('DOMContentLoaded', () => {
    const adsList = document.getElementById('ads-list');
    const loginBtn = document.getElementById('login-btn');
    const createAdBtn = document.getElementById('create-ad-btn');

    loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    createAdBtn.addEventListener('click', () => {
        window.location.href = 'create-ad.html';
    });

    function loadAds() {
        fetch('http://127.0.0.1:8000/api/ads')
            .then(response => response.json())
            .then(data => {
                adsList.innerHTML = '';
                if (data.length === 0) {
                    adsList.innerHTML = '<p>No hay anuncios disponibles.</p>';
                } else {
                    data.forEach(ad => {
                        const adElement = document.createElement('div');
                        adElement.innerHTML = `
                            <img src="${ad.image}" alt="${ad.title}">
                            <h2>${ad.title}</h2>
                            <p>${ad.description}</p>
                            <p>Precio: ${ad.price} €</p>
                            <p>Tipo: ${ad.type}</p>
                            <button onclick="viewAdDetail(${ad.id})">Ver Detalle</button>
                        `;
                        adsList.appendChild(adElement);
                    });
                }
            })
            .catch(error => {
                adsList.innerHTML = '<p>Error al cargar los anuncios. Mostrando anuncio de ejemplo:</p>';
                showExampleAd();
            });
    }

    function showExampleAd() {
        const exampleAd = {
            id: 0,
            title: "Producto de Ejemplo (Reloj)",
            description: "Reloj Fossil de piel.",
            price: 50,
            type: "venta",
            image: "https://via.assets.so/watch.png?id=1&q=95&w=250&h=250&fit=fill"
        };

        const adElement = document.createElement('div');
        adElement.innerHTML = `
            <img src="${exampleAd.image}" alt="${exampleAd.title}">
            <h2>${exampleAd.title}</h2>
            <p>${exampleAd.description}</p>
            <p>Precio: ${exampleAd.price} €</p>
            <p>Tipo: ${exampleAd.type}</p>
            <button onclick="viewAdDetail(${exampleAd.id})">Ver Detalle</button>
        `;
        adsList.appendChild(adElement);
    }

    function viewAdDetail(adId) {
        window.location.href = `ad-detail.html?id=${adId}`;
    }

    loadAds();
});
