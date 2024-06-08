const nodemailer = require('nodemailer');
const gv = require('./gestorVariables.js');
const url = "http://localhost:3000/";
// const url = "https://proyectprocesosfran-dt4p6agska-ew.a.run.app/";

let transporter;

async function configureTransporter() {
    try {
        const options = await gv.obtenerOptions();
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: options.user,
                pass: options.pass
            }
        });
    } catch (error) {
        console.error('Error configuring transporter:', error);
    }
}

// Llama a configureTransporter cuando se carga el módulo
configureTransporter().catch(console.error);

module.exports.enviarEmail = async function (direccion, key, men) {
    if (!transporter) {
        console.error("Transporter is not configured yet.");
        return;
    }
    try {
        const result = await transporter.sendMail({
            from: 'franzuel1@gmail.com',
            to: direccion,
            subject: 'Confirmar cuenta',
            text: men,
            html: `<p>Bienvenido a Sistema</p><p><a href="${url}confirmarUsuario/${direccion}/${key}">Pulsa aquí para confirmar cuenta</a></p>`
        });
        console.log(JSON.stringify(result, null, 4));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};