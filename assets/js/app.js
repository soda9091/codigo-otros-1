// app.js
const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const elements = {
    name: document.querySelector('.name'),
    blog: document.querySelector('.blog'),
    error: document.querySelector('.error')
};

async function displayUser(username) {
    try {
        elements.name.textContent = 'Cargando...';
        elements.error.textContent = '';
        
        const response = await fetch(`${usersEndpoint}/${username}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        elements.name.textContent = data.name || 'Usuario sin nombre registrado';
        elements.blog.textContent = data.blog || 'El usuario no tiene blog público';
        elements.blog.href = data.blog || '#';

    } catch (err) {
        handleError(err);
    }
}

function handleError(error) {
    console.error('Error en la solicitud:', error);
    elements.error.textContent = `Error: ${error.message}`;
    elements.name.textContent = '';
    elements.blog.textContent = '';
}

// Iniciar búsqueda
displayUser('stolinski');