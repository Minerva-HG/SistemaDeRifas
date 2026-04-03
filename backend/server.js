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

// ✅ 3. CORS CORRECTO PARA PRODUCCIÓN
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    const allowed = [
      'https://sistema-de-rifas-jbbj.vercel.app',
    ];
    // Also allow any Vercel preview deployment for this project
    const isVercelPreview = /^https:\/\/sistema-de-rifas-jbbj.*\.vercel\.app$/.test(origin);
    if (allowed.includes(origin) || isVercelPreview) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

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
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
``
