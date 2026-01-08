import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server URL

export function subscribeToNotifications(callback) {
  socket.on('notification', callback);
}

export function subscribeToVisitUpdates(callback) {
  socket.on('visit-update', callback);
}

export function disconnectSocket() {
  socket.disconnect();
}

export default socket;