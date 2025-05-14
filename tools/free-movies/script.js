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
// script.js - Watch Page Logic

const videoPlayer = document.getElementById('video-player');
const adOverlay = document.getElementById('ad-overlay');
const skipBtn = document.getElementById('skip-btn');

let adPlaying = false;
let adTimer;

// Function to play video
function playVideo(url) {
    videoPlayer.src = url;
    videoPlayer.play();
}

// Function to handle ad display
function showAd() {
    adOverlay.style.display = 'block';
    adPlaying = true;
    adTimer = setTimeout(() => {
        skipBtn.style.display = 'block';
    }, 5000); // Show skip button after 5 seconds
}

// Function to skip ad
skipBtn.addEventListener('click', () => {
    adOverlay.style.display = 'none';
    adPlaying = false;
    clearTimeout(adTimer);
});

// Watch Later Feature
const WATCH_LATER_KEY = 'watchLaterList';

function addToWatchLater(movie) {
    let watchLaterList = JSON.parse(localStorage.getItem(WATCH_LATER_KEY)) || [];
    watchLaterList.push(movie);
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(watchLaterList));
}

function getWatchLaterList() {
    return JSON.parse(localStorage.getItem(WATCH_LATER_KEY)) || [];
}

// Example: Play a movie and trigger ad
playVideo('https://www.example.com/movie.mp4');
setTimeout(showAd, 3000); // Show ad after 3 seconds

// Example usage:
// addToWatchLater({ title: 'Sample Movie', url: 'https://www.example.com/movie.mp4' });
// console.log(getWatchLaterList());
