require('dotenv').config();
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const { connectDatabase } = require('./config/database');
const alumnoRoutes = require('./routes/alumnoRoutes');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alumnos_crud';

const app = express();

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
    partialsDir: path.join(__dirname, '..', 'views', 'partials'),
    helpers: {
      range(from, to) {
        const out = [];
        for (let i = from; i <= to; i += 1) out.push(i);
        return out;
      },
      eq(a, b) {
        if (a === undefined || a === null || b === undefined || b === null) return false;
        return String(a) === String(b);
      },
    },
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.redirect('/alumnos');
});

app.use('/alumnos', alumnoRoutes);

app.use((req, res) => {
  res.status(404).render('error', { title: 'No encontrado', message: 'La ruta solicitada no existe.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Ocurrió un error en el servidor. Revisa la consola o la conexión a MongoDB.',
  });
});

async function main() {
  await connectDatabase(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('No se pudo iniciar la aplicación:', err.message);
  process.exit(1);
});
