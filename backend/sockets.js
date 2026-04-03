module.exports = (io) => {
  io.on('connection', socket => {
    console.log('🟢 Usuario conectado');

    socket.on('bloquear', numero => {
      socket.broadcast.emit('bloqueado', numero);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Usuario desconectado');
    });
  });
};