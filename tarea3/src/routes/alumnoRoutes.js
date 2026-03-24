const express = require('express');
const alumnoController = require('../controllers/alumnoController');
const { alumnoValidators } = require('../validators/alumnoValidators');

const router = express.Router();

router.get('/', alumnoController.listar);
router.get('/nuevo', alumnoController.formularioNuevo);
router.post('/', alumnoValidators, alumnoController.crear);
router.get('/:id/editar', alumnoController.formularioEditar);
router.post('/:id/eliminar', alumnoController.eliminarLogico);
router.post('/:id', alumnoValidators, alumnoController.actualizar);

module.exports = router;
