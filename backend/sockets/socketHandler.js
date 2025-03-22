module.exports = (io) => {
    io.on('connection', (socket) => {
     
      socket.on('appointmentCreated', (data) => {
        // Örnek: yeni randevu oluşturulduğunda tüm kullanıcılara bildirim
        io.emit('newAppointment', data);
      });
  
      socket.on('paymentReceived', (data) => {
        io.emit('paymentNotification', data);
      });
  
    
    });
  };
  