document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const movieList = document.getElementById('movie-list');

    searchInput.addEventListener('input', (e) => {
        searchMovies(e.target.value);
    });

    function searchMovies(query) {
        movieList.innerHTML = 'Loading...';
        fetch(`${API_URLS.youtube}?q=${query}&key=${API_KEYS.youtube}`)
            .then(res => res.json())
            .then(data => {
                movieList.innerHTML = '';
                data.items.forEach(item => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.textContent = item.snippet.title;
                    movieCard.onclick = () => {
                        window.location.href = `watch.html?id=${item.id.videoId}`;
                    };
                    movieList.appendChild(movieCard);
                });
            });
    }
});
