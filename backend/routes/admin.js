const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const sql = `
    SELECT * FROM admins 
    WHERE usuario = ? AND password = ?
  `;

  db.query(sql, [usuario, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const admin = results[0];

    // ✅ CREAR TOKEN
    const token = jwt.sign(
      { id: admin.id, usuario: admin.usuario },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: '✅ Login correcto',
      token
    });
  });
});

router.get('/boletos', auth, (req, res) => {
  const sql = `
    SELECT 
      boletos.numero,
      boletos.vendido,
      compradores.nombre,
      compradores.whatsapp
    FROM boletos
    LEFT JOIN compradores
    ON boletos.comprador_id = compradores.id
    ORDER BY boletos.numero
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }

    res.json(results);
  });
});

module.exports = router;