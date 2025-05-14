const WATCH_LATER_KEY = 'watchLaterList';

function getWatchLater() {
    return JSON.parse(localStorage.getItem(WATCH_LATER_KEY)) || [];
}

function addToWatchLater(movie) {
    let watchLaterList = getWatchLater();
    if (!watchLaterList.find(item => item.id === movie.id)) {
        watchLaterList.push(movie);
        localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(watchLaterList));
    }
}
