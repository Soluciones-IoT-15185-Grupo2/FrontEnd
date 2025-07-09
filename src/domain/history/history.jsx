import React, { useState, useEffect } from "react";
import Navbar from "../../infraestructure/ui/components/navbar/navbar";
import "./history.css";

export function History() {
    const [translations, setTranslations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de historial desde localStorage o API
        loadTranslationHistory();
    }, []);

    const loadTranslationHistory = () => {
        // Simular historial de traducciones
        const mockHistory = [
            {
                id: 1,
                timestamp: "2025-01-09 10:30:25",
                translation: "Hola",
                confidence: 95.2,
                sensorData: "10 sensores activos"
            },
            {
                id: 2,
                timestamp: "2025-01-09 10:35:12",
                translation: "Gracias",
                confidence: 87.8,
                sensorData: "10 sensores activos"
            },
            {
                id: 3,
                timestamp: "2025-01-09 10:40:55",
                translation: "Buenos días",
                confidence: 92.1,
                sensorData: "10 sensores activos"
            },
            {
                id: 4,
                timestamp: "2025-01-09 10:45:33",
                translation: "Por favor",
                confidence: 89.5,
                sensorData: "10 sensores activos"
            },
            {
                id: 5,
                timestamp: "2025-01-09 10:50:18",
                translation: "Adiós",
                confidence: 94.7,
                sensorData: "10 sensores activos"
            }
        ];

        setTimeout(() => {
            setTranslations(mockHistory);
            setLoading(false);
        }, 1000);
    };

    const clearHistory = () => {
        setTranslations([]);
    };

    const exportHistory = () => {
        const dataStr = JSON.stringify(translations, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `glovetalk-history-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    return (
        <>
            <Navbar/>
            <div className="history">
                <div className="history-header">
                    <h1>📚 Historial de Traducciones</h1>
                    <div className="history-actions">
                        <button onClick={exportHistory} className="export-btn">
                            💾 Exportar
                        </button>
                        <button onClick={clearHistory} className="clear-btn">
                            🗑️ Limpiar
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-history">
                        <div className="spinner"></div>
                        <p>Cargando historial...</p>
                    </div>
                ) : translations.length === 0 ? (
                    <div className="empty-history">
                        <h3>📭 No hay traducciones en el historial</h3>
                        <p>Comienza a usar GloveTalk para ver tus traducciones aquí</p>
                    </div>
                ) : (
                    <div className="translations-list">
                        <div className="stats">
                            <div className="stat-item">
                                <span className="stat-number">{translations.length}</span>
                                <span className="stat-label">Traducciones</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    {(translations.reduce((acc, t) => acc + t.confidence, 0) / translations.length).toFixed(1)}%
                                </span>
                                <span className="stat-label">Precisión promedio</span>
                            </div>
                        </div>

                        {translations.map((translation) => (
                            <div key={translation.id} className="translation-item">
                                <div className="translation-header">
                                    <span className="translation-text">{translation.translation}</span>
                                    <span className={`confidence ${translation.confidence >= 90 ? 'high' : translation.confidence >= 80 ? 'medium' : 'low'}`}>
                                        {translation.confidence}%
                                    </span>
                                </div>
                                <div className="translation-details">
                                    <span className="timestamp">🕒 {translation.timestamp}</span>
                                    <span className="sensor-info">📊 {translation.sensorData}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}