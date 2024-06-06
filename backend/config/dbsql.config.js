const sql = require('mssql');

// Configuration de la connexion à la base de données
const config = {
    user: 'sa',
    password: 'kittyadmin',
    server: 'localhost\\KITTY', // Vous pouvez utiliser 'localhost' pour une base de données locale
    database: 'kittydelivery',
    options: {
        encrypt: true, // Utilisez false pour désactiver le chiffrement
        trustServerCertificate: true // Utilisez false pour désactiver la confiance dans le certificat du serveur
    }
    
};

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Connexion réussie à la base de données SQL Server');
    } catch (err) {
        console.error('Erreur de connexion à la base de données SQL Server:', err);
    }
}

module.exports = { sql, connectToDatabase };
