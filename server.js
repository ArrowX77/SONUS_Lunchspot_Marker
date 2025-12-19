const express = require('express');
const http = require('http');
const path = require('path'); // <--- NEU: Hilft Pfade zu finden
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// <--- GEÄNDERT: Diese Zeile macht den Pfad "idiotensicher"
app.use(express.static(path.join(__dirname, 'public')));

let currentTable = null;

io.on('connection', (socket) => {
    if (currentTable) {
        socket.emit('update_position', currentTable);
    }
    socket.on('mark_table', (data) => {
        currentTable = data;
        io.emit('update_position', currentTable);
    });
});

server.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});