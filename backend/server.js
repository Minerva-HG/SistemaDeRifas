const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');

// ✅ 1. Crear app
const app = express();
const server = http.createServer(app);

// ✅ 2. Socket.IO
const io = socketio(server, {
  cors: {
    origin: [
      'https://sistema-de-rifas-jbbj.vercel.app',
      'https://sistema-de-rifas-jbbj-alrxk60g7-minerva-hgs-projects.vercel.app'
    ],
    methods: ['GET', 'POST']
  }
});
app.set('io', io);

// ✅ 3. CORS CORRECTO PARA PRODUCCIÓN
app.use(cors({
  origin: [
    'https://sistema-de-rifas-jbbj.vercel.app',
    'https://sistema-de-rifas-jbbj-alrxk60g7-minerva-hgs-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Permitir preflight (MUY IMPORTANTE)
app.options('*', cors({
  origin: [
    'https://sistema-de-rifas-jbbj.vercel.app',
    'https://sistema-de-rifas-jbbj-alrxk60g7-minerva-hgs-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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
server.listen(3000, () => {
  console.log('✅ Servidor corriendo en puerto 3000');
});