# SmartSign - Traductor de Señas con Guantes Inteligentes

SmartSign es una aplicación web que traduce el lenguaje de señas en tiempo real utilizando guantes inteligentes equipados con sensores MPU y ESP32.

## 🚀 Características

- **Traducción en tiempo real**: Conecta con guantes inteligentes para traducir señas instantáneamente
- **Interfaz moderna**: Diseño responsive y fácil de usar
- **Historial de traducciones**: Guarda y exporta el historial de traducciones
- **Conexión WebSocket**: Recibe datos en tiempo real desde los ESP32
- **Modo simulación**: Prueba la aplicación sin hardware físico

## 🛠️ Tecnologías

### Frontend
- React 19.1.0
- React Router DOM
- Axios para peticiones HTTP
- CSS3 con animaciones

### Backend (Separado)
- FastAPI
- TensorFlow/PyTorch para el modelo de IA
- WebSocket para comunicación en tiempo real

## 📡 Formato de Datos

La aplicación recibe datos de sensores en el siguiente formato desde los ESP32:

```json
{
  "data": [
    -6.552, 1.9, 7.649, -0.108, -0.035, -0.033,
    -6.206, 0.231, 7.544, -0.103, -0.019, -0.013,
    -7.137, -0.391, 6.414, -0.058, -0.045, 0.011,
    -7.897, -3.794, 4.27, -0.1, -0.038, -0.037,
    -7.752, -5.157, 3.092, -0.128, -0.042, -0.034,
    -3.855, -6.883, 3.748, 0.393, 0.688, 0.058,
    -0.786, -3.446, 1.31, -0.008, 0.191, 1.062,
    -5.289, -2.794, 1.812, -0.536, 0.146, 0.635,
    -9.019, -0.485, 0.621, -0.875, 0.44, -0.141,
    -7.155, 0.937, -0.113, -0.508, 0.09, 0.622
  ]
}
```

## 🏗️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend FastAPI ejecutándose en `http://127.0.0.1:8000`

### Instalación
```bash
# Clonar el repositorio
git clone [tu-repositorio]
cd smartsign

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🎮 Uso de la Aplicación

### 1. Página de Inicio (Login)
- Ingresa tus credenciales para acceder al traductor

### 2. Página Principal (Home)
- **Estado de conexión**: Verifica si está conectado al servidor backend
- **Estado de guantes**: Muestra si los guantes están conectados
- **Iniciar Detección**: Comienza a escuchar datos de los guantes en tiempo real
- **Simular Traducción**: Prueba la funcionalidad sin hardware físico
- **Visualización de datos**: Muestra los valores de los 10 sensores MPU
- **Resultado de traducción**: Presenta la seña detectada

### 3. Historial
- Ve todas las traducciones realizadas
- Estadísticas de precisión
- Exportar historial en formato JSON
- Limpiar historial

## 🔧 Configuración de API

El archivo `src/config/api.config.js` contiene la configuración del backend:

```javascript
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
```

## 📡 Endpoints del Backend

- `GET /`: Verificar estado de la API
- `POST /predict`: Enviar datos de sensores para traducción
- `WebSocket /ws`: Conexión en tiempo real para datos de ESP32

## 🤖 Hardware

### Guantes Inteligentes
- **Sensores**: 10 sensores MPU (acelerómetro, giroscopio, magnetómetro)
- **Microcontrolador**: 2 ESP32 (uno por guante)
- **Conectividad**: WiFi para envío de datos al backend
- **Frecuencia de muestreo**: Configurable (recomendado: 50Hz)

### Datos de Sensores
Cada sensor MPU proporciona 6 valores:
- 3 ejes de aceleración (X, Y, Z)
- 3 ejes de rotación (Pitch, Roll, Yaw)

Total: 60 valores por muestra (10 sensores × 6 valores)

## 🚨 Solución de Problemas

### Error de Conexión
- Verifica que el backend esté ejecutándose en el puerto 8000
- Comprueba la configuración de CORS en el backend
- Revisa la URL en `api.config.js`

### Guantes No Detectados
- Verifica la conexión WiFi de los ESP32
- Comprueba que los ESP32 estén enviando datos al endpoint correcto
- Revisa la configuración de WebSocket en el backend

### Baja Precisión en Traducciones
- Calibra los sensores MPU
- Verifica que todos los sensores estén funcionando
- Asegúrate de que el modelo de IA esté entrenado correctamente

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

- Desarrollo Frontend: [Tu nombre]
- Desarrollo Backend: [Nombre del equipo backend]
- Hardware: [Nombre del equipo hardware]
- IA/ML: [Nombre del equipo de machine learning]

---

¡Gracias por usar SmartSign! 🤟✨
