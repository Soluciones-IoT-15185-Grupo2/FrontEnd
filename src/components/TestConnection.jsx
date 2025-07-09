import React, { useState } from 'react';
import { translationService } from '../infraestructure/services/translationService';

const TestConnection = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            const response = await translationService.checkApiStatus();
            setStatus('✅ Conexión exitosa: ' + JSON.stringify(response));
        } catch (error) {
            setStatus('❌ Error de conexión: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const testSensorTranslation = async () => {
        setLoading(true);
        try {
            const result = await translationService.simulateSensorData();
            setStatus('✅ Traducción exitosa: ' + JSON.stringify(result));
        } catch (error) {
            setStatus('❌ Error en traducción: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>🧪 Test de Conexión API - GloveTalk</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button onClick={testConnection} disabled={loading}>
                    {loading ? 'Probando...' : '🔗 Probar Conexión'}
                </button>
                <button onClick={testSensorTranslation} disabled={loading}>
                    {loading ? 'Traduciendo...' : '🤲 Probar Traducción'}
                </button>
            </div>
            <div style={{ 
                marginTop: '10px', 
                padding: '10px', 
                backgroundColor: '#f5f5f5',
                borderRadius: '5px',
                fontFamily: 'monospace',
                fontSize: '12px',
                maxHeight: '200px',
                overflow: 'auto'
            }}>
                {status || 'Presiona un botón para probar...'}
            </div>
        </div>
    );
};

export default TestConnection;
