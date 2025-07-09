import axios from 'axios';
import config from '../../config/api.config.js';

// Instancia de axios con configuración por defecto
const apiClient = axios.create({
    baseURL: config.API_BASE_URL,
    timeout: config.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la API:', error);
        return Promise.reject(error);
    }
);

export const translationService = {
    // Enviar datos de sensores para traducción
    async translateSensorData(sensorData) {
        try {
            const response = await apiClient.post('/predict', {
                data: sensorData
            });
            
            return response.data;
        } catch (error) {
            throw new Error(`Error al traducir datos de sensores: ${error.message}`);
        }
    },

    // Verificar estado de la API
    async checkApiStatus() {
        try {
            const response = await apiClient.get('/');
            return response.data;
        } catch (error) {
            throw new Error(`API no disponible: ${error.message}`);
        }
    }
};
