const { body } = require('express-validator');

const semestreOptions = () =>
  body('semestre')
    .notEmpty()
    .withMessage('El semestre es obligatorio.')
    .bail()
    .isInt({ min: 1, max: 10 })
    .withMessage('El semestre debe ser un número entre 1 y 10.');

const rules = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio.'),
  body('correo')
    .trim()
    .notEmpty()
    .withMessage('El correo es obligatorio.')
    .bail()
    .isEmail()
    .withMessage('El correo debe tener un formato válido.'),
  body('expediente')
    .trim()
    .notEmpty()
    .withMessage('El número de expediente es obligatorio.'),
  semestreOptions(),
];

module.exports = { alumnoValidators: rules };
