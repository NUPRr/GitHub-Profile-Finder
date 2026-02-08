const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('user-form');
const search = document.getElementById('search');

async function getUser(username) {
    try {
        const response = await fetch(APIURL + username);
        
        if(!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        createUserCard(data);
    } catch (err) {
        showError("No profile with this username");
    }
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name || user.login}</h2>
                <p>${user.bio || 'This profile has no bio'}</p>
                
                <div class="stats">
                    <div>${user.followers} <span>Followers</span></div>
                    <div>${user.following} <span>Following</span></div>
                    <div>${user.public_repos} <span>Repos</span></div>
                </div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function showError(msg) {
    main.innerHTML = `<div class="card"><h1>${msg}</h1></div>`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = '';
    }
});