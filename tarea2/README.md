# Tarea 2 - Web App de Presentacion

App basica con Express para mostrar un CV en linea y un formulario de contacto.

## Rutas

- `GET /` muestra la pagina principal
- `GET /contacto` muestra el formulario
- `POST /contacto` recibe el form y lo reenvia a FormSubmit

## Como correr el proyecto

1. Entra a la carpeta:

```bash
cd tarea2
```

2. Instala dependencias:

```bash
npm install
```

3. Opcional: cambia el correo de FormSubmit en tus variables de entorno:

```bash
export FORM_SUBMIT_EMAIL=tu-correo@ejemplo.com
```

4. Inicia el server:

```bash
npm start
```

5. Abre en tu navegador:

```bash
http://localhost:3000
```

## Nota

La primera vez que uses FormSubmit con un correo nuevo, el servicio manda un correo de activacion a esa direccion.
