const USERS_KEY = 'usersList';
const CURRENT_USER_KEY = 'currentUser';

function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    if (users.find(user => user.username === username)) {
        alert('Username already exists.');
        return false;
    }
    users.push({ username, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert('Registration successful. Please log in.');
    window.location.href = 'login.html';
}

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        alert('Login successful.');
        window.location.href = '../index.html';
    } else {
        alert('Invalid username or password.');
    }
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'login.html';
}
