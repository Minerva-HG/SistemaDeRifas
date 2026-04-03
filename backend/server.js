require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

// ✅ 1. Crear app
const app = express();
const server = http.createServer(app);

// ✅ 2. Socket.IO
const io = socketio(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = ['https://sistema-de-rifas-jbbj.vercel.app'];
      const isVercelPreview = /^https:\/\/sistema-de-rifas-jbbj.*\.vercel\.app$/.test(origin);
      if (allowed.includes(origin) || isVercelPreview) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST']
  }
});
app.set('io', io);

// ✅ 3. CORS - middleware manual (compatible con Express 5)
const ALLOWED_ORIGINS = [
  'https://sistema-de-rifas-jbbj.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    /^https:\/\/sistema-de-rifas-jbbj.*\.vercel\.app$/.test(origin)
  );

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// ✅ 4. Middleware JSON
app.use(express.json());

// ✅ 5. Conectar BD
require('./db');

// ✅ 6. Rutas
app.use('/api/boletos', require('./routes/boletos'));
app.use('/api/compradores', require('./routes/compradores'));
app.use('/api/pagos', require('./routes/pagos'));
app.use('/api/admin', require('./routes/admin'));

// ✅ 7. Sockets
require('./sockets')(io);

// ✅ 8. Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Servidor de Rifas funcionando');
});

// ✅ 9. Arranque del servidor

// ✅ PUERTO CORRECTO PARA RAILWAY (ESTO ARREGLA EL 502)
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
