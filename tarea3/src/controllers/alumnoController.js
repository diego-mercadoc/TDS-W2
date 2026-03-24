const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Alumno = require('../models/Alumno');

function idInvalido(id) {
  return !mongoose.Types.ObjectId.isValid(id);
}

function collectErrors(req) {
  const result = validationResult(req);
  if (result.isEmpty()) return null;
  return result.array().map((e) => e.msg);
}

async function listar(req, res) {
  const alumnos = await Alumno.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
  let success = null;
  if (req.query.creado === '1') success = 'Alumno creado correctamente.';
  if (req.query.actualizado === '1') success = 'Alumno actualizado correctamente.';
  if (req.query.eliminado === '1') success = 'Alumno eliminado lógicamente.';
  res.render('alumnos/lista', {
    title: 'Alumnos',
    alumnos,
    errors: null,
    success,
  });
}

function formularioNuevo(req, res) {
  res.render('alumnos/nuevo', {
    title: 'Nuevo alumno',
    alumno: { nombre: '', correo: '', expediente: '', semestre: '' },
    errors: null,
  });
}

async function crear(req, res) {
  const errors = collectErrors(req);
  if (errors) {
    return res.status(400).render('alumnos/nuevo', {
      title: 'Nuevo alumno',
      alumno: {
        nombre: req.body.nombre ?? '',
        correo: req.body.correo ?? '',
        expediente: req.body.expediente ?? '',
        semestre: req.body.semestre ?? '',
      },
      errors,
    });
  }

  await Alumno.create({
    nombre: req.body.nombre,
    correo: req.body.correo,
    expediente: req.body.expediente,
    semestre: Number(req.body.semestre),
  });

  res.redirect('/alumnos?creado=1');
}

async function formularioEditar(req, res) {
  if (idInvalido(req.params.id)) {
    return res.status(400).render('error', { title: 'Solicitud inválida', message: 'Identificador no válido.' });
  }
  const alumno = await Alumno.findOne({ _id: req.params.id, isDeleted: false }).lean();
  if (!alumno) {
    return res.status(404).render('error', { title: 'No encontrado', message: 'Alumno no encontrado.' });
  }
  res.render('alumnos/editar', {
    title: 'Editar alumno',
    alumno,
    errors: null,
  });
}

async function actualizar(req, res) {
  if (idInvalido(req.params.id)) {
    return res.status(400).render('error', { title: 'Solicitud inválida', message: 'Identificador no válido.' });
  }
  const errors = collectErrors(req);
  const existente = await Alumno.findOne({ _id: req.params.id, isDeleted: false }).lean();
  if (!existente) {
    return res.status(404).render('error', { title: 'No encontrado', message: 'Alumno no encontrado.' });
  }

  if (errors) {
    return res.status(400).render('alumnos/editar', {
      title: 'Editar alumno',
      alumno: {
        ...existente,
        nombre: req.body.nombre ?? existente.nombre,
        correo: req.body.correo ?? existente.correo,
        expediente: req.body.expediente ?? existente.expediente,
        semestre: req.body.semestre ?? existente.semestre,
      },
      errors,
    });
  }

  await Alumno.updateOne(
    { _id: req.params.id, isDeleted: false },
    {
      nombre: req.body.nombre,
      correo: req.body.correo,
      expediente: req.body.expediente,
      semestre: Number(req.body.semestre),
    }
  );

  res.redirect('/alumnos?actualizado=1');
}

async function eliminarLogico(req, res) {
  if (idInvalido(req.params.id)) {
    return res.status(400).render('error', { title: 'Solicitud inválida', message: 'Identificador no válido.' });
  }
  const result = await Alumno.updateOne(
    { _id: req.params.id, isDeleted: false },
    { isDeleted: true }
  );
  if (result.matchedCount === 0) {
    return res.status(404).render('error', { title: 'No encontrado', message: 'Alumno no encontrado.' });
  }
  res.redirect('/alumnos?eliminado=1');
}

module.exports = {
  listar,
  formularioNuevo,
  crear,
  formularioEditar,
  actualizar,
  eliminarLogico,
};
