const socket = io();
// WICHTIG: Wir holen uns jetzt den Container, nicht nur das Bild
const mapContainer = document.getElementById('map-container'); 
const redDot = document.getElementById('red-dot');

// Wir hören auf Klicks auf den GANZEN Container
mapContainer.addEventListener('click', (e) => {
    
    // Wir berechnen die Koordinaten relativ zum Container
    const rect = mapContainer.getBoundingClientRect();
    
    // Position berechnen
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;

    // Nur senden, wenn wir innerhalb von 0-100% sind (falls man den Rand trifft)
    if(x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        console.log("Treffer! Sende an Server:", x, y);
        socket.emit('mark_table', { x, y });
    }
});

socket.on('update_position', (pos) => {
    console.log("Neue Position empfangen!");
    redDot.style.display = 'block';
    redDot.style.left = pos.x + '%';
    redDot.style.top = pos.y + '%';
});