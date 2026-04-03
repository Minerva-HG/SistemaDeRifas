const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener boletos
router.get('/', (req, res) => {
  db.query('SELECT * FROM boletos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener boletos' });
    }
    res.json(results);
  });
});

// Vender boleto
router.post('/comprar', (req, res) => {
  const { numero, comprador_id } = req.body;
  const io = req.app.get('io');


  if (!numero || !comprador_id) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Verificar si ya está vendido
  const verificar = 'SELECT * FROM boletos WHERE numero = ? AND vendido = 1';
  db.query(verificar, [numero], (err, results) => {
    if (results.length > 0) {
      return res.status(409).json({ error: 'Boleto ya vendido' });
    }

    // Marcar como vendido
    const vender = `
      UPDATE boletos 
      SET vendido = 1, comprador_id = ?
      WHERE numero = ?
    `;

    db.query(vender, [comprador_id, numero], err => {
      if (err) {
        return res.status(500).json({ error: 'Error al vender boleto' });
      }

      
    // ✅ ESTA ES LA CLAVE
      io.emit('boleto-vendido', numero);

      res.json({ message: '✅ Boleto vendido correctamente' });
    });
  });
});

module.exports = router;