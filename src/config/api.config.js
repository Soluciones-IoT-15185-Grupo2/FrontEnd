// Configuración del entorno
const config = {
    development: {
        API_BASE_URL: 'http://127.0.0.1:8000',
        TIMEOUT: 10000
    },
    production: {
        API_BASE_URL: 'https://your-production-api.com',
        TIMEOUT: 15000
    }
};

// Determinar el entorno actual
const environment = process.env.NODE_ENV || 'development';

// Exportar configuración del entorno actual
export default config[environment];
