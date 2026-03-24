const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    correo: { type: String, required: true, trim: true, lowercase: true },
    expediente: { type: String, required: true, trim: true },
    semestre: { type: Number, required: true, min: 1, max: 10 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alumno', alumnoSchema);
