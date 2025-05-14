// data.js - API Configuration and Endpoints

const API_KEYS = {
    youtube: 'YOUR_YOUTUBE_API_KEY',
    tmdb: 'YOUR_TMDB_API_KEY',
    vimeo: 'YOUR_VIMEO_API_KEY',
    pexels: 'YOUR_PEXELS_API_KEY',
    dailymotion: 'YOUR_DAILYMOTION_API_KEY'
};

const API_URLS = {
    youtube: `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=${API_KEYS.youtube}&q=`,
    tmdb: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEYS.tmdb}&language=en-US&page=1`,
    vimeo: `https://api.vimeo.com/videos`,
    pexels: `https://api.pexels.com/videos/search`,
    dailymotion: `https://api.dailymotion.com/videos`,
    archive: `https://archive.org/advancedsearch.php?q=subject:movie&output=json&rows=10`
};

const HEADERS = {
    pexels: { 'Authorization': API_KEYS.pexels },
    vimeo: { 'Authorization': `Bearer ${API_KEYS.vimeo}` }
};
