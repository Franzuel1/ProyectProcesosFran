// Importar el cliente de Secret Manager
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

// Función para obtener el correo electrónico de Gmail desde el gestor de variables secretas
async function obtenerGmailEmail() {
    try {
        // Obtener el correo electrónico de Gmail de una variable de entorno
        const gmailEmail = process.env.GMAIL_EMAIL;
        if (!gmailEmail) {
            throw new Error("La variable de entorno GMAIL_EMAIL no está configurada");
        }
        console.log("Correo electrónico de Gmail obtenido:", gmailEmail);
        return gmailEmail;
    } catch (error) {
        console.error("Error al obtener el correo electrónico de Gmail:", error);
        throw error;
    }
}

// Modificar el método obtenerOptions para incluir el correo electrónico de Gmail
async function obtenerOptions() {
    try {
        // Obtener el correo electrónico de Gmail
        const user = process.env.GMAIL_EMAIL;
        // Obtener la contraseña de Gmail de una variable de entorno
        const password = process.env.GMAIL_PASSWORD;
        if (!password) {
            throw new Error("La variable de entorno GMAIL_PASSWORD no está configurada");
        }
        // Crear las opciones
        const options = {
            user: user,
            pass: password
        };
        console.log("Opciones obtenidas:", options);
        return options;
    } catch (error) {
        console.error("Error al obtener las opciones:", error);
        throw error;
    }
}

// Exportar las funciones
module.exports = { obtenerOptions };
