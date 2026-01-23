const express = require('express');
const app = express();
const PORT = 3000;

// URL base de la API que vamos a consumir
const API_URL = 'https://jsonplaceholder.typicode.com';

// Ruta para traer todos los users
app.get('/users', async (req, res) => {
    try {
        // fetch a la api externa
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        res.json(users);
    } catch (error) {
        // si algo falla mandamos un 500
        res.status(500).json({ error: 'No se pudieron traer los users' });
    }
});

// Ruta para traer un user por su id
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${API_URL}/users/${id}`);
        const user = await response.json();
        
        // checamos si el user existe
        if (!user.id) {
            return res.status(404).json({ error: 'User no encontrado' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo traer el user' });
    }
});

// iniciamos el server
app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});
