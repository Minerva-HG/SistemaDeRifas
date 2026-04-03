const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar pago
router.post('/', (req, res) => {
  const { comprador_id, monto } = req.body;

  if (!comprador_id || !monto) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const sql = `
    INSERT INTO pagos (comprador_id, monto, estado)
    VALUES (?, ?, 'confirmado')
  `;

  db.query(sql, [comprador_id, monto], err => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar pago' });
    }

    res.json({ message: '✅ Pago confirmado' });
  });
});

module.exports = router;