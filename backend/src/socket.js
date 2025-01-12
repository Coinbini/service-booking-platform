const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Join a room for specific booking
    socket.on('join-booking', (bookingId) => {
      socket.join(`booking-${bookingId}`);
    });

    // Handle location updates from service providers
    socket.on('update-location', ({ bookingId, location }) => {
      io.to(`booking-${bookingId}`).emit('provider-location', location);
    });

    // Handle chat messages
    socket.on('send-message', ({ bookingId, message, sender }) => {
      io.to(`booking-${bookingId}`).emit('new-message', {
        message,
        sender,
        timestamp: new Date()
      });
    });

    // Handle voice call signals
    socket.on('call-user', ({ bookingId, signal }) => {
      io.to(`booking-${bookingId}`).emit('incoming-call', { signal });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = setupSocket;
