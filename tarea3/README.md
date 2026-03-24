# Tarea 3 — CRUD Alumnos (Node, Express, MongoDB, Handlebars)

Aplicación web para administrar alumnos: listado, alta, edición y **eliminación lógica** (`isDeleted`). Interfaz con **Bootstrap 5** (CDN).

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- [MongoDB](https://www.mongodb.com/) accesible (local o URI remota)

## Estructura del proyecto

```
tarea3/
├── src/
│   ├── app.js                 # Entrada Express, vistas, estáticos
│   ├── config/database.js     # Conexión Mongoose
│   ├── controllers/           # Lógica HTTP
│   ├── models/                # Esquema Mongoose
│   ├── routes/                # Rutas REST/HTML
│   └── validators/            # express-validator
├── views/                     # Plantillas Handlebars
├── public/                    # Archivos estáticos (opcional)
├── package.json
├── .env.example
└── README.md
```

## Configuración

1. Entra a esta carpeta:

   ```bash
   cd tarea3
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` (puedes copiar `.env.example`):

   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/alumnos_crud
   ```

   Ajusta `MONGODB_URI` si usas MongoDB Atlas u otro host.

## Ejecutar

Con MongoDB en marcha:

```bash
npm start
```

Abre en el navegador: `http://localhost:3000` (redirige a `/alumnos`).

Modo desarrollo con recarga al guardar (Node 18+):

```bash
npm run dev
```

## Rutas principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/alumnos` | Lista alumnos activos |
| GET | `/alumnos/nuevo` | Formulario de alta |
| POST | `/alumnos` | Crear alumno |
| GET | `/alumnos/:id/editar` | Formulario de edición |
| POST | `/alumnos/:id` | Actualizar alumno |
| POST | `/alumnos/:id/eliminar` | Eliminación lógica |

## Validación

Servidor: campos obligatorios, correo con formato válido, semestre entero entre 1 y 10, expediente no vacío. Los formularios HTML incluyen `required` como apoyo en el cliente.

## Datos del alumno

- Nombre  
- Correo electrónico  
- Número de expediente  
- Semestre (1–10)  
- `isDeleted` (interno; los eliminados no se listan)
