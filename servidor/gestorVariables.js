const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessCLAVECORREO() {
    const name = 'projects/162867793/secrets/CLAVECORREO/versions/1';
    const [version] = await client.accessSecretVersion({
        name: name,
    });
    const datos = version.payload.data.toString("utf8");
    return datos;
}
