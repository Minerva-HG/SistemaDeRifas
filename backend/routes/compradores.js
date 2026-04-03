const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar comprador
router.post('/', (req, res) => {
  const { nombre, whatsapp } = req.body;

  if (!nombre || !whatsapp) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const sql = 'INSERT INTO compradores (nombre, whatsapp) VALUES (?, ?)';

  db.query(sql, [nombre, whatsapp], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al registrar comprador' });
    }

    res.json({
      message: '✅ Comprador registrado',
      comprador_id: result.insertId
    });
  });
});

module.exports = router;