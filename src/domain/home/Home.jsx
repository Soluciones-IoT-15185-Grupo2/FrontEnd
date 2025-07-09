import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import Navbar from "../../infraestructure/ui/components/navbar/navbar.jsx";
import { translationService } from "../../infraestructure/services/translationService.js";

export function Home() {
    const [translation, setTranslation] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [connectedGloves, setConnectedGloves] = useState(0);
    const [isTranslating, setIsTranslating] = useState(false);
    const [lastSensorData, setLastSensorData] = useState(null);
    const [gestureCount, setGestureCount] = useState(0);
    const [connectionStatus, setConnectionStatus] = useState("disconnected"); // disconnected, connecting, connected
    
    const wsRef = useRef(null);
    const translationIntervalRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    // Conectar al servidor WebSocket de guantes
    const connectToGloveServer = () => {
        setConnectionStatus("connecting");
        
        try {
            wsRef.current = new WebSocket('ws://localhost:8080');
            
            wsRef.current.onopen = () => {
                console.log("🔌 Conectado al servidor de guantes");
                setConnectionStatus("connected");
                
                // Solicitar estado de guantes conectados
                wsRef.current.send(JSON.stringify({ type: 'requestStatus' }));
            };
            
            wsRef.current.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    
                    switch (message.type) {
                        case 'glovesStatus':
                            setConnectedGloves(message.count);
                            break;
                            
                        case 'gloveConnected':
                            setConnectedGloves(prev => prev + 1);
                            console.log(`🧤 Guante ${message.gloveId} conectado`);
                            break;
                            
                        case 'gloveDisconnected':
                            setConnectedGloves(prev => Math.max(0, prev - 1));
                            console.log(`🧤 Guante ${message.gloveId} desconectado`);
                            break;
                            
                        case 'sensorData':
                            // Recibir datos de sensores reales
                            setLastSensorData(message.data);
                            setGestureCount(prev => prev + 1);
                            console.log(`📊 Datos recibidos del guante ${message.gloveId}:`, message.data.slice(0, 6), "...");
                            break;
                            
                        default:
                            console.log("Mensaje desconocido:", message);
                    }
                } catch (error) {
                    console.error("Error procesando mensaje WebSocket:", error);
                }
            };
            
            wsRef.current.onclose = () => {
                console.log("🔌 Desconectado del servidor de guantes");
                setConnectionStatus("disconnected");
                setConnectedGloves(0);
                
                // Intentar reconectar después de 3 segundos
                reconnectTimeoutRef.current = setTimeout(() => {
                    connectToGloveServer();
                }, 3000);
            };
            
            wsRef.current.onerror = (error) => {
                console.error("❌ Error WebSocket:", error);
                setConnectionStatus("disconnected");
            };
            
        } catch (error) {
            console.error("❌ Error conectando a servidor:", error);
            setConnectionStatus("disconnected");
        }
    };

    // Conectar automáticamente al cargar
    useEffect(() => {
        connectToGloveServer();
        
        // Limpiar al desmontar
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (translationIntervalRef.current) {
                clearInterval(translationIntervalRef.current);
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

    // Iniciar proceso de traducción
    const startTranslation = () => {
        if (connectedGloves < 2 || !lastSensorData) {
            return;
        }

        setIsTranslating(true);
        setCurrentWord("");
        
        // Traducir inmediatamente el primer gesto si hay datos
        if (lastSensorData) {
            translateCurrentGesture();
        }
        
        // NO configuramos intervalo aquí porque los datos llegan cada 5s del hardware
    };

    // Detener traducción
    const stopTranslation = () => {
        setIsTranslating(false);
        
        // Mover la palabra actual a la traducción final
        if (currentWord) {
            setTranslation(prev => prev ? `${prev} ${currentWord}` : currentWord);
            setCurrentWord("");
        }
    };

    // Traducir gesto cuando llegan nuevos datos (automático)
    useEffect(() => {
        if (isTranslating && lastSensorData) {
            translateCurrentGesture();
        }
    }, [lastSensorData, isTranslating]);

    // Traducir gesto actual
    const translateCurrentGesture = async () => {
        if (!lastSensorData || !isTranslating) return;

        try {
            const result = await translationService.translateSensorData(lastSensorData);
            const letter = result.prediction || result.translation || result.message || "?";
            
            // Agregar la letra a la palabra actual
            setCurrentWord(prev => prev + letter);
            console.log("🔤 Nueva letra traducida:", letter);
        } catch (error) {
            console.error("❌ Error en traducción:", error);
        }
    };

    // Limpiar todo
    const clearAll = () => {
        setCurrentWord("");
        setTranslation("");
        setGestureCount(0);
    };

    // Reconectar manualmente
    const reconnectToServer = () => {
        if (wsRef.current) {
            wsRef.current.close();
        }
        connectToGloveServer();
    };

    return (
        <>
            <Navbar />
            <div className="home">
                <h1>GloveTalk</h1>
                
                <div className="glove-status-section">
                    <div className={`connection-status ${connectionStatus}`}>
                        {connectionStatus === 'disconnected' && '🔴 Desconectado del servidor'}
                        {connectionStatus === 'connecting' && '🟡 Conectando...'}
                        {connectionStatus === 'connected' && '🟢 Servidor conectado'}
                    </div>
                    
                    <div className={`glove-status ${connectedGloves === 2 ? 'ready' : 'waiting'}`}>
                        🧤 Guantes conectados: {connectedGloves}/2
                        {connectedGloves === 2 && ' ✅ Listos para traducir'}
                    </div>
                    
                    {connectedGloves > 0 && (
                        <div className="data-collection-status">
                            📊 Datos recibidos: {gestureCount} gestos
                        </div>
                    )}
                </div>

                <div className="control-buttons">
                    {connectionStatus === 'disconnected' && (
                        <button 
                            className="reconnect-btn"
                            onClick={reconnectToServer}
                        >
                            � Reconectar al Servidor
                        </button>
                    )}

                    {connectedGloves === 2 && !isTranslating && (
                        <button 
                            className="translate-btn primary"
                            onClick={startTranslation}
                            disabled={!lastSensorData}
                        >
                            🎯 Iniciar Traducción
                        </button>
                    )}

                    {isTranslating && (
                        <button 
                            className="translate-btn stop"
                            onClick={stopTranslation}
                        >
                            ⏹️ Detener Traducción
                        </button>
                    )}

                    {(currentWord || translation) && (
                        <button 
                            className="clear-btn"
                            onClick={clearAll}
                        >
                            🔄 Limpiar
                        </button>
                    )}
                </div>

                {connectedGloves < 2 && connectionStatus === 'connected' && (
                    <div className="waiting-message">
                        <p>⏳ Esperando que se conecten ambos guantes...</p>
                        <small>Asegúrate de que los ESP32 estén conectados por USB-C</small>
                    </div>
                )}

                {isTranslating && (
                    <div className="translation-status">
                        <div className="current-word-section">
                            <label>📝 Traduciendo en tiempo real:</label>
                            <div className="current-word-box">
                                {currentWord || "..."}
                                <span className="cursor-blink">|</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="translation-section">
                    <label>💬 Traducción Completa:</label>
                    <div className="translation-result-box">
                        {translation || "Las palabras traducidas aparecerán aquí"}
                    </div>
                </div>

                {lastSensorData && (
                    <div className="sensor-info">
                        <small>🔧 Debug: Últimos 6 valores de sensores: [{lastSensorData.slice(0, 6).join(', ')}...]</small>
                    </div>
                )}
            </div>
        </>
    );
}