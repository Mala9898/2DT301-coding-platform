import io from 'socket.io-client';
export let socket;

export const initiateSocket = (room) => {
  socket = io('http://localhost:5000', { secure: true, reconnection: true, rejectUnauthorized: false });
  console.log(`Connecting socket...`);
  if (socket && room) {
      socket.emit('join', room);
      console.log("socket && room ")
  }
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  socket.on("reee", (err) => {
    console.log(`MY RESPONSE ${err}`);
  });
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}