async function searchMusic() {
    const query = document.getElementById("searchInput").value;
    const resultsContainer = document.getElementById("resultadosPesquisa");

    // Limpar resultados anteriores
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.innerHTML = '<p>Por favor, digite o nome da música.</p>';
        return;
    }

    // Fazer a requisição à API do iTunes
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=60`);
    const data = await response.json();

    if (data.results.length === 0) {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    // Exibir os resultados
    data.results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'item-resultado';
        
        resultItem.innerHTML = `
            <img src="${result.artworkUrl100}" alt="${result.trackName}">
            <h2>${result.trackName}</h2>
            <p>${result.artistName}</p>
            <audio controls>
                <source src="${result.previewUrl}" type="audio/mpeg">
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <a href="${result.collectionViewUrl}" target="_blank">Ver na iTunes Store</a>
        `;

        resultsContainer.appendChild(resultItem);
    });
}
