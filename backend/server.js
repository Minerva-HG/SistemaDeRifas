const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');


// ✅ 1. Crear app PRIMERO
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });
app.set('io', io); // Para usar io en rutas

// ✅ 2. Middlewares
app.use(cors());
app.use(express.json());

// ✅ 3. Conectar BD
require('./db');

// ✅ 4. Rutas DESPUÉS de crear app
app.use('/api/boletos', require('./routes/boletos'));
app.use('/api/compradores', require('./routes/compradores'));

// ✅ 5. Sockets
require('./sockets')(io);

// ✅ 6. Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Servidor de Rifas funcionando');
});

// ✅ 7. Arranque del servidor
server.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});

// Admin
app.use('/api/admin', require('./routes/admin'));
//pagos
app.use('/api/pagos', require('./routes/pagos'));
