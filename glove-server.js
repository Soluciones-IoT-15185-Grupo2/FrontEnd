const express = require('express');
const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server, port: 8080 });

app.use(cors());
app.use(express.json());

let connectedGloves = new Map(); // Map<portPath, {port, parser, gloveId}>
let glovesData = {};
let clientConnections = new Set();

console.log('🚀 Iniciando servidor de guantes...');

// Detectar puertos serie disponibles (ESP32)
const detectGloves = async () => {
    try {
        const ports = await SerialPort.list();
        console.log('📋 Puertos disponibles:', ports.map(p => `${p.path} (${p.manufacturer})`));
        
        // Filtrar puertos que puedan ser ESP32
        const glovePorts = ports.filter(port => 
            port.manufacturer?.toLowerCase().includes('silicon labs') ||
            port.manufacturer?.toLowerCase().includes('cp21') ||
            port.manufacturer?.toLowerCase().includes('esp32') ||
            port.vendorId === '10C4' || // Silicon Labs
            port.vendorId === '1A86'    // CH340/CH341
        );
        
        console.log('🧤 Puertos ESP32 detectados:', glovePorts.map(p => p.path));
        return glovePorts;
    } catch (error) {
        console.error('❌ Error detectando puertos:', error);
        return [];
    }
};

// Conectar a un guante específico
const connectToGlove = (portPath, gloveId) => {
    try {
        console.log(`🔌 Intentando conectar al guante ${gloveId} en ${portPath}...`);
        
        const port = new SerialPort({ 
            path: portPath, 
            baudRate: 115200,
            autoOpen: false
        });
        
        port.open((err) => {
            if (err) {
                console.error(`❌ Error abriendo puerto ${portPath}:`, err.message);
                return;
            }
            
            console.log(`✅ Guante ${gloveId} conectado en ${portPath}`);
            
            const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
            
            parser.on('data', (data) => {
                try {
                    // Intentar parsear JSON
                    let sensorData;
                    if (data.startsWith('{')) {
                        sensorData = JSON.parse(data);
                    } else {
                        // Si no es JSON, asumir que es un array de números separados por comas
                        const values = data.trim().split(',').map(v => parseFloat(v.trim()));
                        sensorData = { data: values };
                    }
                    
                    glovesData[gloveId] = sensorData;
                    
                    // Enviar datos a todos los clientes WebSocket
                    const message = JSON.stringify({
                        type: 'sensorData',
                        gloveId,
                        data: sensorData.data || sensorData,
                        timestamp: Date.now()
                    });
                    
                    clientConnections.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(message);
                        }
                    });
                    
                    console.log(`📊 Datos del guante ${gloveId}:`, (sensorData.data || sensorData).slice(0, 6), '...');
                } catch (error) {
                    console.error(`❌ Error procesando datos del guante ${gloveId}:`, error.message);
                    console.log('📄 Datos recibidos:', data);
                }
            });
            
            port.on('error', (err) => {
                console.error(`❌ Error en guante ${gloveId}:`, err.message);
                disconnectGlove(portPath);
            });
            
            port.on('close', () => {
                console.log(`🔌 Guante ${gloveId} desconectado`);
                disconnectGlove(portPath);
            });
            
            // Guardar la conexión
            connectedGloves.set(portPath, { port, parser, gloveId });
            
            // Notificar a clientes
            broadcastGloveStatus();
        });
        
    } catch (error) {
        console.error(`❌ Error conectando guante ${gloveId}:`, error.message);
    }
};

// Desconectar un guante
const disconnectGlove = (portPath) => {
    if (connectedGloves.has(portPath)) {
        const { port, gloveId } = connectedGloves.get(portPath);
        
        try {
            if (port.isOpen) {
                port.close();
            }
        } catch (error) {
            console.error(`❌ Error cerrando puerto ${portPath}:`, error);
        }
        
        connectedGloves.delete(portPath);
        delete glovesData[gloveId];
        
        // Notificar a clientes
        broadcastGloveStatus();
    }
};

// Enviar estado de guantes a todos los clientes
const broadcastGloveStatus = () => {
    const message = JSON.stringify({
        type: 'glovesStatus',
        count: connectedGloves.size,
        gloves: Array.from(connectedGloves.values()).map(g => g.gloveId)
    });
    
    clientConnections.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

// Escanear y conectar guantes automáticamente
const scanAndConnectGloves = async () => {
    const availablePorts = await detectGloves();
    
    for (let i = 0; i < availablePorts.length && i < 2; i++) {
        const port = availablePorts[i];
        if (!connectedGloves.has(port.path)) {
            const gloveId = `glove_${i + 1}`;
            connectToGlove(port.path, gloveId);
            
            // Esperar un poco entre conexiones
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};

// Configurar WebSocket
wss.on('connection', (ws) => {
    console.log('🌐 Cliente WebSocket conectado');
    clientConnections.add(ws);
    
    // Enviar estado inicial
    ws.send(JSON.stringify({
        type: 'glovesStatus',
        count: connectedGloves.size,
        gloves: Array.from(connectedGloves.values()).map(g => g.gloveId)
    }));
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            
            switch (data.type) {
                case 'requestStatus':
                    broadcastGloveStatus();
                    break;
                case 'scanGloves':
                    scanAndConnectGloves();
                    break;
                default:
                    console.log('📨 Mensaje desconocido:', data);
            }
        } catch (error) {
            console.error('❌ Error procesando mensaje WebSocket:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('🌐 Cliente WebSocket desconectado');
        clientConnections.delete(ws);
    });
    
    ws.on('error', (error) => {
        console.error('❌ Error WebSocket:', error);
        clientConnections.delete(ws);
    });
});

// Endpoint REST para estado
app.get('/status', (req, res) => {
    res.json({
        connectedGloves: connectedGloves.size,
        gloves: Array.from(connectedGloves.values()).map(g => g.gloveId),
        lastData: glovesData
    });
});

// Escanear guantes al inicio
scanAndConnectGloves();

// Re-escanear cada 10 segundos si no hay guantes conectados
setInterval(() => {
    if (connectedGloves.size < 2) {
        console.log('🔍 Re-escaneando puertos...');
        scanAndConnectGloves();
    }
}, 10000);

// Iniciar servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Servidor de guantes ejecutándose en puerto ${PORT}`);
    console.log(`🌐 WebSocket disponible en ws://localhost:${PORT}`);
    console.log(`📡 REST API disponible en http://localhost:${PORT}/status`);
});

// Manejar cierre del proceso
process.on('SIGINT', () => {
    console.log('🛑 Cerrando servidor...');
    
    // Cerrar todas las conexiones de guantes
    connectedGloves.forEach((glove, portPath) => {
        disconnectGlove(portPath);
    });
    
    process.exit(0);
});
