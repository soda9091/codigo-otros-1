// app.js actualizado
const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const elements = {
    name: document.querySelector('.name'),
    blog: document.querySelector('.blog'), // Ahora sí es un <a>
    error: document.querySelector('.error')
};

async function displayUser(username) {
    try {
        elements.name.textContent = 'Cargando...';
        elements.error.textContent = '';
        elements.blog.textContent = ''; // Limpiar contenido previo
        
        const response = await fetch(`${usersEndpoint}/${username}`);
        if (!response.ok) throw new Error(`Usuario no encontrado (${response.status})`);
        
        const data = await response.json();
        
        elements.name.textContent = data.name || 'Sin nombre público';
        if(data.blog) {
            elements.blog.href = data.blog;
            elements.blog.textContent = data.blog;
        } else {
            elements.blog.textContent = 'No tiene blog público';
            elements.blog.removeAttribute('href');
        }

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