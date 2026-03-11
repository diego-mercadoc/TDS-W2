const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const formSubmitEmail =
  process.env.FORM_SUBMIT_EMAIL || "diegomercadocoello@hotmail.com";

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function sendHtml(res, viewName) {
  res.sendFile(path.join(__dirname, "views", viewName));
}

app.get("/", (req, res) => {
  sendHtml(res, "index.html");
});

app.get("/contacto", (req, res) => {
  sendHtml(res, "contacto.html");
});

app.post("/contacto", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).send(`
      <h1>Faltan datos</h1>
      <p>Completa nombre, correo y mensaje.</p>
      <a href="/contacto">Volver al formulario</a>
    `);
  }

  const nextUrl = `${req.protocol}://${req.get("host")}/contacto?enviado=1`;

  // Pagina puente para que Express procese y luego FormSubmit envie
  return res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Enviando mensaje...</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: Arial, sans-serif;
            background: #f4efe8;
            color: #1b1b1b;
          }
          main {
            max-width: 560px;
            padding: 32px;
            border: 1px solid #d9cdbf;
            border-radius: 20px;
            background: #fffaf4;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>Enviando mensaje...</h1>
          <p>Te redirigimos al servicio que manda el correo.</p>
          <form id="relay-form" action="https://formsubmit.co/${formSubmitEmail}" method="POST">
            <input type="hidden" name="name" value="${escapeHtml(nombre)}" />
            <input type="hidden" name="email" value="${escapeHtml(correo)}" />
            <input type="hidden" name="message" value="${escapeHtml(mensaje)}" />
            <input
              type="hidden"
              name="_subject"
              value="${escapeHtml(`Nuevo mensaje desde tarea2 de ${nombre}`)}"
            />
            <input type="hidden" name="_next" value="${escapeHtml(nextUrl)}" />
            <input type="hidden" name="_captcha" value="false" />
            <noscript>
              <button type="submit">Continuar con el envio</button>
            </noscript>
          </form>
        </main>
        <script>
          document.getElementById("relay-form").submit();
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  // Log simple para ver que el server subio
  console.log(`Server corriendo en http://localhost:${PORT}`);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
